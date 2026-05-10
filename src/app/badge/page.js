import { Preview } from '@/geist/components'
import { Badge } from '@/geist/components'
import Link from 'next/link'

function LogoSlackColor(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3.42681 10.0787C3.42681 10.9984 2.68351 11.7417 1.76382 11.7417C0.844137 11.7417 0.10083 10.9984 0.10083 10.0787C0.10083 9.15906 0.844137 8.41575 1.76382 8.41575H3.42681V10.0787ZM4.25831 10.0787C4.25831 9.15906 5.00162 8.41575 5.9213 8.41575C6.84099 8.41575 7.58429 9.15906 7.58429 10.0787V14.2362C7.58429 15.1559 6.84099 15.8992 5.9213 15.8992C5.00162 15.8992 4.25831 15.1559 4.25831 14.2362V10.0787Z"
        fill="#E01E5A"
      />
      <path
        d="M5.92121 3.40158C5.00152 3.40158 4.25821 2.65827 4.25821 1.73858C4.25821 0.818899 5.00152 0.075592 5.92121 0.075592C6.84089 0.075592 7.5842 0.818899 7.5842 1.73858V3.40158H5.92121ZM5.92121 4.24567C6.84089 4.24567 7.5842 4.98898 7.5842 5.90866C7.5842 6.82835 6.84089 7.57165 5.92121 7.57165H1.75113C0.831442 7.57165 0.0881348 6.82835 0.0881348 5.90866C0.0881348 4.98898 0.831442 4.24567 1.75113 4.24567H5.92121Z"
        fill="#36C5F0"
      />
      <path
        d="M12.5858 5.90866C12.5858 4.98898 13.3291 4.24567 14.2488 4.24567C15.1685 4.24567 15.9118 4.98898 15.9118 5.90866C15.9118 6.82835 15.1685 7.57165 14.2488 7.57165H12.5858V5.90866ZM11.7543 5.90866C11.7543 6.82835 11.011 7.57165 10.0913 7.57165C9.17165 7.57165 8.42834 6.82835 8.42834 5.90866V1.73858C8.42834 0.818899 9.17165 0.075592 10.0913 0.075592C11.011 0.075592 11.7543 0.818899 11.7543 1.73858V5.90866Z"
        fill="#2EB67D"
      />
      <path
        d="M10.0913 12.5732C11.011 12.5732 11.7543 13.3165 11.7543 14.2362C11.7543 15.1559 11.011 15.8992 10.0913 15.8992C9.17165 15.8992 8.42834 15.1559 8.42834 14.2362V12.5732H10.0913ZM10.0913 11.7417C9.17165 11.7417 8.42834 10.9984 8.42834 10.0787C8.42834 9.15906 9.17165 8.41575 10.0913 8.41575H14.2614C15.1811 8.41575 15.9244 9.15906 15.9244 10.0787C15.9244 10.9984 15.1811 11.7417 14.2614 11.7417H10.0913Z"
        fill="#ECB22E"
      />
    </svg>
  )
}

function Shield(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.5 4.057V9.52717C3.5 10.9221 4.27429 12.2018 5.50997 12.849L8 14.1533L10.49 12.849C11.7257 12.2018 12.5 10.9221 12.5 9.52717V4.057C12.3094 4.00405 12.1074 3.9513 11.8932 3.89539C11.746 3.85699 11.5932 3.81709 11.4344 3.7746C10.8476 3.61758 10.204 3.43066 9.61101 3.17017C9.02666 2.91351 8.44336 2.56529 8 2.05704C7.55664 2.56529 6.97334 2.91351 6.38899 3.17017C5.79596 3.43066 5.15243 3.61758 4.5656 3.7746C4.40682 3.81709 4.25396 3.85699 4.10684 3.89539C3.89262 3.9513 3.69055 4.00405 3.5 4.057ZM7.25 0C7.25 0.467199 7.10537 0.796772 6.87802 1.06132C6.6357 1.34329 6.26955 1.58432 5.78576 1.79681C5.30375 2.00853 4.75351 2.17155 4.17787 2.32558C4.04421 2.36134 3.90727 2.39707 3.76932 2.43305C3.33687 2.54586 2.89458 2.66124 2.51283 2.78849L2 2.95943V3.5V9.52717C2 11.4801 3.084 13.2716 4.81396 14.1778L7.65199 15.6644L8 15.8467L8.34801 15.6644L11.186 14.1778C12.916 13.2716 14 11.4801 14 9.52717V3.5V2.95943L13.4872 2.78849C13.1054 2.66124 12.6631 2.54586 12.2307 2.43305C12.0927 2.39707 11.9558 2.36134 11.8221 2.32558C11.2465 2.17155 10.6962 2.00853 10.2142 1.79681C9.73045 1.58432 9.3643 1.34329 9.12198 1.06132C8.89463 0.796772 8.75 0.467199 8.75 0H7.25Z"
        fill="currentColor"
      />
    </svg>
  )
}

function BadgeRow({ children }) {
  return (
    <div className="flex flex-row items-stretch justify-start gap-1 flex-initial">{children}</div>
  )
}

function BadgeIconRow({ variant, label }) {
  const subtleVariant = `${variant}-subtle`

  return (
    <div className="flex flex-row items-center justify-start gap-1 flex-initial">
      <Badge icon={<Shield />} size="lg" variant={variant}>
        {label}
      </Badge>
      <Badge icon={<Shield />} size="md" variant={variant}>
        {label}
      </Badge>
      <Badge icon={<Shield />} size="sm" variant={variant}>
        {label}
      </Badge>

      <Badge icon={<Shield />} size="sm" variant={subtleVariant}>
        {label}
      </Badge>
      <Badge icon={<Shield />} size="md" variant={subtleVariant}>
        {label}
      </Badge>
      <Badge icon={<Shield />} size="lg" variant={subtleVariant}>
        {label}
      </Badge>
    </div>
  )
}

const examples = {
  'badge-pill': {
    name: 'badge-pill',
    component: function BadgePillExample() {
      return (
        <div className="flex flex-col items-stretch justify-start gap-4 flex-initial">
          <div className="flex flex-row items-stretch justify-start gap-2 flex-initial">
            <Badge as={Link} href="#badge#pill" size="sm" variant="pill">
              Label
            </Badge>
            <Badge as={Link} href="#badge#pill" size="md" variant="pill">
              Label
            </Badge>
            <Badge as={Link} href="#badge#pill" size="lg" variant="pill">
              Label
            </Badge>
          </div>

          <div className="flex flex-row items-stretch justify-start gap-2 flex-initial">
            <Badge as={Link} href="#badge#pill" icon={<LogoSlackColor />} size="sm" variant="pill">
              Label
            </Badge>
            <Badge as={Link} href="#badge#pill" icon={<LogoSlackColor />} size="md" variant="pill">
              Label
            </Badge>
            <Badge as={Link} href="#badge#pill" icon={<LogoSlackColor />} size="lg" variant="pill">
              Label
            </Badge>
          </div>
        </div>
      )
    },
  },

  'badge-sizes': {
    name: 'badge-sizes',
    component: function BadgeSizesExample() {
      return (
        <div className="flex flex-row items-start justify-start gap-2 flex-initial">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      )
    },
  },

  'badge-variants': {
    name: 'badge-variants',
    component: function BadgeVariantsExample() {
      return (
        <div className="flex flex-col items-stretch justify-start gap-2 flex-initial">
          <BadgeRow>
            <Badge variant="gray">gray</Badge>
            <Badge variant="gray-subtle">gray-subtle</Badge>
          </BadgeRow>

          <BadgeRow>
            <Badge variant="blue">blue</Badge>
            <Badge variant="blue-subtle">blue-subtle</Badge>
          </BadgeRow>

          <BadgeRow>
            <Badge variant="purple">purple</Badge>
            <Badge variant="purple-subtle">purple-subtle</Badge>
          </BadgeRow>

          <BadgeRow>
            <Badge variant="amber">amber</Badge>
            <Badge variant="amber-subtle">amber-subtle</Badge>
          </BadgeRow>

          <BadgeRow>
            <Badge variant="red">red</Badge>
            <Badge variant="red-subtle">red-subtle</Badge>
          </BadgeRow>

          <BadgeRow>
            <Badge variant="pink">pink</Badge>
            <Badge variant="pink-subtle">pink-subtle</Badge>
          </BadgeRow>

          <BadgeRow>
            <Badge variant="green">green</Badge>
            <Badge variant="green-subtle">green-subtle</Badge>
          </BadgeRow>

          <BadgeRow>
            <Badge variant="teal">teal</Badge>
            <Badge variant="teal-subtle">teal-subtle</Badge>
          </BadgeRow>

          <BadgeRow>
            <Badge variant="inverted">inverted</Badge>
          </BadgeRow>

          <div>
            <Badge variant="trial">Trial</Badge>
          </div>

          <div>
            <Badge variant="turbo">Turborepo</Badge>
          </div>
        </div>
      )
    },
  },

  'badge-with-icons': {
    name: 'badge-with-icons',
    component: function BadgeWithIconsExample() {
      return (
        <div className="flex flex-col items-stretch justify-start gap-2 flex-initial">
          <BadgeIconRow variant="gray" label="gray" />
          <BadgeIconRow variant="blue" label="blue" />
          <BadgeIconRow variant="purple" label="purple" />
          <BadgeIconRow variant="amber" label="amber" />
          <BadgeIconRow variant="red" label="red" />
          <BadgeIconRow variant="pink" label="pink" />
          <BadgeIconRow variant="green" label="green" />
          <BadgeIconRow variant="teal" label="teal" />

          <div className="flex flex-row items-center justify-start gap-1 flex-initial">
            <Badge icon={<Shield />} size="lg" variant="inverted">
              inverted
            </Badge>
            <Badge icon={<Shield />} size="md" variant="inverted">
              inverted
            </Badge>
            <Badge icon={<Shield />} size="sm" variant="inverted">
              inverted
            </Badge>
          </div>
        </div>
      )
    },
  },
}

export default function AvatarPage() {
  return (
    <div className="flex flex-col items-start justify-start gap-8">
      {Object.values(examples).map(({ name }) => (
        <div key={name} className="flex flex-col items-start justify-start gap-4">
          <h2 className="text-lg font-medium">{name}</h2>
          <Preview componentRegistry={examples} name={name} />
        </div>
      ))}
    </div>
  )
}
