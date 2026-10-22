import { useEffect, useState } from 'react'
import { ArrowUpRight, Code2, Github, Layers3 } from 'lucide-react'
import { profile, projects } from '../data/portfolio'

const GITHUB_ACTIVITY_URL = 'https://github-contributions-api.jogruber.de/v4/srushtik26?y=last'
const LEETCODE_PROFILE_URL = 'https://leetcode-api-pied.vercel.app/user/Srushtikadam26'
const LEETCODE_CALENDAR_URL = (year) => `https://leetcode-api-pied.vercel.app/user/Srushtikadam26/calendar?year=${year}`
const LEETCODE_FALLBACK_URL = 'https://leetcode-api-faisalshohag.vercel.app/Srushtikadam26'
const CACHE_PREFIX = 'srushti-public-activity-v1:'
const CACHE_DURATION = 30 * 60 * 1000

function contributionLevel(count) {
  return count === 0 ? 0 : count < 2 ? 1 : count < 5 ? 2 : count < 10 ? 3 : 4
}

function readCache(key) {
  try {
    const cached = sessionStorage.getItem(`${CACHE_PREFIX}${key}`)
    if (!cached) return null
    const value = JSON.parse(cached)
    return Date.now() - value.savedAt < CACHE_DURATION ? value.data : null
  } catch (error) {
    console.warn('Could not read cached activity data.', error)
    return null
  }
}

function saveCache(key, data) {
  try {
    sessionStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify({ savedAt: Date.now(), data }))
  } catch (error) {
    console.warn('Could not cache activity data for this session.', error)
  }
}

function normalizeGitHub(payload) {
  if (!Array.isArray(payload?.contributions) || !Number.isFinite(payload?.total?.lastYear)) {
    throw new Error('GitHub activity data did not match the expected format.')
  }

  const contributions = payload.contributions
    .filter((entry) => /^\d{4}-\d{2}-\d{2}$/.test(entry.date) && Number.isFinite(entry.count) && entry.count >= 0)
    .map((entry) => ({
      date: entry.date,
      count: entry.count,
      level: Number.isInteger(entry.level) && entry.level >= 0 && entry.level <= 4
        ? entry.level
        : contributionLevel(entry.count),
    }))
    .sort((a, b) => a.date.localeCompare(b.date))

  if (!contributions.length) throw new Error('GitHub returned no contribution days.')
  return { total: payload.total.lastYear, contributions }
}

function normalizeLeetCode(payload) {
  const counts = [payload?.totalSolved, payload?.easySolved, payload?.mediumSolved, payload?.hardSolved]
  if (!counts.every((count) => Number.isFinite(count) && count >= 0)) {
    throw new Error('LeetCode activity data did not match the expected format.')
  }

  let submissionCalendar = payload.submissionCalendar || {}
  if (typeof submissionCalendar === 'string') {
    try {
      submissionCalendar = JSON.parse(submissionCalendar)
    } catch (error) {
      throw new Error('LeetCode submission calendar was not valid JSON.', { cause: error })
    }
  }
  if (typeof submissionCalendar !== 'object' || Array.isArray(submissionCalendar)) {
    throw new Error('LeetCode activity data did not include a valid submission calendar.')
  }

  const calendar = Object.entries(submissionCalendar)
    .map(([timestamp, count]) => [Number(timestamp), Number(count)])
    .filter(([timestamp, count]) => Number.isFinite(timestamp) && Number.isFinite(count) && count >= 0)

  return {
    totalSolved: payload.totalSolved,
    easySolved: payload.easySolved,
    mediumSolved: payload.mediumSolved,
    hardSolved: payload.hardSolved,
    calendar,
  }
}

async function fetchJson(url, signal) {
  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error(`Activity service returned HTTP ${response.status}.`)
  return response.json()
}

const loadGitHubActivity = async (signal) => normalizeGitHub(await fetchJson(GITHUB_ACTIVITY_URL, signal))

async function loadLeetCodeActivity(signal) {
  const year = new Date().getFullYear()
  try {
    const [profileData, previousCalendar, currentCalendar] = await Promise.all([
      fetchJson(LEETCODE_PROFILE_URL, signal),
      fetchJson(LEETCODE_CALENDAR_URL(year - 1), signal),
      fetchJson(LEETCODE_CALENDAR_URL(year), signal),
    ])
    const solvedCounts = profileData?.submitStats?.acSubmissionNum
    const solvedFor = (difficulty) => solvedCounts?.find((entry) => entry.difficulty === difficulty)?.count
    const submissionCalendar = {
      ...previousCalendar?.submissionCalendar,
      ...currentCalendar?.submissionCalendar,
    }

    return normalizeLeetCode({
      totalSolved: solvedFor('All'),
      easySolved: solvedFor('Easy'),
      mediumSolved: solvedFor('Medium'),
      hardSolved: solvedFor('Hard'),
      submissionCalendar,
    })
  } catch (error) {
    if (signal.aborted) throw error
    console.warn('Primary LeetCode activity service failed; trying the backup service.', error)
    return normalizeLeetCode(await fetchJson(LEETCODE_FALLBACK_URL, signal))
  }
}

function useActivityData(key, load) {
  const [state, setState] = useState(() => {
    const data = readCache(key)
    return { data, status: data ? 'cached' : 'loading' }
  })

  useEffect(() => {
    const controller = new AbortController()
    let timedOut = false
    const timeout = window.setTimeout(() => {
      timedOut = true
      controller.abort()
    }, 9000)

    load(controller.signal)
      .then((data) => {
        saveCache(key, data)
        setState({ data, status: 'live' })
      })
      .catch((error) => {
        if (controller.signal.aborted && !timedOut) return
        if (timedOut) {
          console.warn(`${key} activity data request timed out.`)
        } else {
          console.warn(`Could not load ${key} activity data.`, error)
        }
        setState((current) => ({
          data: current.data,
          status: current.data ? 'cached' : 'unavailable',
        }))
      })
      .finally(() => window.clearTimeout(timeout))

    return () => {
      controller.abort()
      window.clearTimeout(timeout)
    }
  }, [key, load])

  return state
}

function ActivityCard({ icon: Icon, title, subtitle, description, status, profileUrl, children, className = '' }) {
  return (
    <article className={`activity-card ${className}`}>
      <div className="activity-title">
        <span className="activity-icon"><Icon aria-hidden="true" /></span>
        <div><h3>{title}</h3><p>{subtitle}</p></div>
      </div>
      <p className="activity-description">{description}</p>
      {children}
      <div className="activity-card-footer">
        <span className={`data-source data-source-${status}`}>
          {status === 'live' ? 'Live profile data' : status === 'cached' ? 'Cached profile data' : status === 'loading' ? 'Loading profile data' : status === 'snapshot' ? 'Public profile snapshot' : 'Live data unavailable'}
        </span>
        <a className="text-link" href={profileUrl} target="_blank" rel="noreferrer">
          View profile <ArrowUpRight size={14} />
        </a>
      </div>
    </article>
  )
}

function ContributionGraph({ days, label }) {
  const firstDate = new Date(`${days[0].date}T00:00:00`)
  const offset = (firstDate.getDay() + 6) % 7
  const cells = [...Array(offset).fill(null), ...days]
  const weeks = []
  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7))
  }

  return (
    <div className="activity-calendar" role="img" aria-label={label}>
      <div className="calendar-viewport">
        <div className="calendar-months" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${weeks.length}, var(--calendar-column-size))` }}>
          {weeks.map((week, index) => {
            const date = week.find(Boolean)?.date
            if (!date) return <span key={index} />
            const current = new Date(`${date}T00:00:00`)
            const previous = weeks[index - 1]?.find(Boolean)?.date
            return <span key={index}>{!previous || new Date(`${previous}T00:00:00`).getMonth() !== current.getMonth() ? current.toLocaleString('en', { month: 'short' }) : ''}</span>
          })}
        </div>
        <div className="calendar-graph">
          <div className="calendar-days" aria-hidden="true">
            <span>Mon</span><span>Wed</span><span>Fri</span>
          </div>
          <div className="calendar-weeks">
            {weeks.map((week, weekIndex) => (
              <div className="calendar-week" key={weekIndex}>
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const entry = week[dayIndex]
                  if (!entry) return <i className="calendar-cell is-empty" key={dayIndex} />
                  return <i
                    className={`calendar-cell level-${entry.level ?? contributionLevel(entry.count)}`}
                    key={entry.date}
                    title={`${entry.date}: ${entry.count} ${entry.count === 1 ? 'activity' : 'activities'}`}
                  />
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="calendar-legend"><span>Less</span>{[0, 1, 2, 3, 4].map((level) => <i className={`calendar-cell level-${level}`} key={level} />)}<span>More</span></div>
    </div>
  )
}

function GitHubCard() {
  const { data, status } = useActivityData('github', loadGitHubActivity)
  const repositories = projects.filter((project) => project.repository).slice(0, 2)

  return (
    <ActivityCard
      icon={Github}
      title="GitHub"
      subtitle="Contribution activity"
      description="A year of public contribution history, with selected repositories."
      status={status}
      profileUrl={profile.github}
      className="github-activity-card"
    >
      {data ? (
        <>
          <div className="activity-statline"><strong>{data.total}</strong><span>contributions in the last year</span></div>
          <ContributionGraph days={data.contributions} label={`GitHub contribution activity over the last year. ${data.total} contributions.`} />
        </>
      ) : (
        <div className="activity-fallback"><Github size={22} /><span>{status === 'loading' ? 'Fetching public contribution history…' : 'Open GitHub to view the contribution graph.'}</span></div>
      )}
      <div className="activity-repositories">
        {repositories.map((project) => (
          <a href={project.repository} key={project.name} target="_blank" rel="noreferrer">
            <span>{project.name}</span><ArrowUpRight size={12} />
          </a>
        ))}
      </div>
      <p className="activity-attribution">
        Contribution data: <a href="https://github-contributions-api.jogruber.de/" target="_blank" rel="noreferrer">GitHub Contributions API</a>.
      </p>
    </ActivityCard>
  )
}

function LeetCodeCard() {
  const { data, status } = useActivityData('leetcode', loadLeetCodeActivity)
  const endDate = new Date()
  const endIso = endDate.toISOString().slice(0, 10)
  const startDate = new Date(`${endIso}T00:00:00Z`)
  startDate.setUTCDate(startDate.getUTCDate() - 364)
  const calendar = new Map(data?.calendar.map(([timestamp, count]) => [
    new Date(timestamp * 1000).toISOString().slice(0, 10),
    count,
  ]) || [])
  const days = data ? Array.from({ length: 365 }, (_, index) => {
    const date = new Date(startDate)
    date.setUTCDate(date.getUTCDate() + index)
    const isoDate = date.toISOString().slice(0, 10)
    const count = calendar.get(isoDate) || 0
    return { date: isoDate, count, level: contributionLevel(count) }
  }) : []
  const totalSubmissions = days.reduce((total, day) => total + day.count, 0)
  const activeDays = days.filter((day) => day.count > 0).length

  return (
    <ActivityCard
      icon={Code2}
      title="LeetCode"
      subtitle="Problems & submissions"
      description="Solved totals and submission activity from the public profile."
      status={status}
      profileUrl={profile.leetcode}
      className="leetcode-activity-card"
    >
      {data ? (
        <>
          <div className="leetcode-summary">
            <div><strong>{data.totalSolved}</strong><span>problems solved</span></div>
            <div className="difficulty-list">
              <span><i className="difficulty-easy" />Easy <b>{data.easySolved}</b></span>
              <span><i className="difficulty-medium" />Medium <b>{data.mediumSolved}</b></span>
              <span><i className="difficulty-hard" />Hard <b>{data.hardSolved}</b></span>
            </div>
          </div>
          <div className="leetcode-year-stats" aria-label="LeetCode activity over the last year">
            <span><strong>{totalSubmissions}</strong> submissions</span>
            <span><strong>{activeDays}</strong> active days</span>
          </div>
          {days?.length ? (
            <ContributionGraph
              days={days}
              label={`LeetCode submissions over the last year. ${totalSubmissions} submissions across ${activeDays} active days.`}
            />
          ) : (
            <div className="activity-fallback"><Code2 size={22} /><span>No submission calendar was returned for this profile.</span></div>
          )}
          <p className="activity-attribution">
            Stats via <a href="https://leetcode-api-pied.vercel.app/" target="_blank" rel="noreferrer">LeetCode public profile API</a>; refreshed from the public profile.
          </p>
        </>
      ) : (
        <div className="activity-fallback"><Code2 size={22} /><span>{status === 'loading' ? 'Fetching public problem and submission data…' : 'Open LeetCode to view profile activity.'}</span></div>
      )}
    </ActivityCard>
  )
}

function TufCard() {
  const progress = profile.tufProgress
  const percentage = progress ? (progress.solved / progress.total) * 100 : 0

  return (
    <ActivityCard
      icon={Layers3}
      title="Take U Forward"
      subtitle="Striver A2Z DSA progress"
      description="Your published roadmap progress, as shown on the public profile."
      status="snapshot"
      profileUrl={profile.tuf}
      className="tuf-activity-card"
    >
      {progress ? (
        <div className="tuf-progress">
          <div className="tuf-progress-header"><strong>{progress.solved}<span> / {progress.total}</span></strong><small>{percentage.toFixed(1)}% complete</small></div>
          <div className="tuf-progress-track" role="progressbar" aria-label="Take U Forward roadmap problems completed" aria-valuenow={progress.solved} aria-valuemin={0} aria-valuemax={progress.total}>
            <span style={{ width: `${percentage}%` }} />
          </div>
          <p>Roadmap problems completed</p>
          <p className="activity-attribution">Public profile snapshot · verified {new Date(`${progress.verifiedOn}T00:00:00`).toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric' }).replace(',', '')}. Not a live feed.</p>
        </div>
      ) : (
        <div className="activity-fallback"><Layers3 size={22} /><span>Progress details are not available.</span></div>
      )}
    </ActivityCard>
  )
}

function DeveloperActivity() {
  return (
    <section className="content-section activity-section">
      <div className="page-width">
        <div className="section-heading">
          <p className="eyebrow"><span>02</span> / Developer activity</p>
          <div className="section-heading-row">
            <h2>The work behind the code.</h2>
            <p>Real profile activity, without invented stats.</p>
          </div>
        </div>
        <div className="activity-grid">
          <GitHubCard />
          <LeetCodeCard />
          <TufCard />
        </div>
      </div>
    </section>
  )
}

export default DeveloperActivity
