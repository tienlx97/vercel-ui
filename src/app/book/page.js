import { Book, Preview } from '@/geist/components'

const bookTitle = 'The user experience of the Frontend Cloud'
const designTitle = 'Design Engineering at Vercel'

const BookColors = () => (
  <div className="flex flex-row items-baseline justify-start gap-8 flex-initial">
    <Book color="#9D2127" title="How Vercel improves your website's search engine ranking" />
    <Book color="#7DC1C1" textColor="white" title={designTitle} variant="simple" />
    <Book color="#FED954" title={bookTitle} />
  </div>
)

const BookDefault = () => <Book title={bookTitle} />

function IllustrationOne() {
  return (
    <svg
      fill="none"
      width="197"
      height="149"
      viewBox="0 0 197 149"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="#FED954" width="197" height="149" />
      <path
        d="M147 48.4995H172C185.531 48.4995 196.5 59.4685 196.5 72.9995V148.427"
        stroke="#ECAF14"
      />
      <path d="M0 48.5H24.5C38.031 48.5 49 37.531 49 24V0" stroke="#ECAF14" />
      <path d="M147.5 48.5H172C185.531 48.5 196.5 37.531 196.5 24V0" stroke="#ECAF14" />
      <path d="M0 48.5H24.5C38.031 48.5 49 59.469 49 73V98" stroke="#ECAF14" />
      <path d="M146 48.5H73.5C59.969 48.5 49 37.531 49 24V0" stroke="#ECAF14" />
      <path d="M196 48.5H122.5C108.969 48.5 98 37.531 98 24V0" stroke="#ECAF14" />
      <path d="M97 48.5H73.5C59.969 48.5 49 59.469 49 73V99.5" stroke="#ECAF14" />
      <path d="M98 132.5H122.5C136.031 132.5 147 121.531 147 108V98.9512" stroke="#ECAF14" />
      <path d="M196 132.5H171.5C157.969 132.5 147 121.531 147 108V48.5" stroke="#ECAF14" />
      <path d="M147 48.5H122.5C108.969 48.5 98 59.469 98 73V132" stroke="#ECAF14" />
      <path d="M98 132.5H73.5C59.969 132.5 49 121.531 49 108V98.9512" stroke="#ECAF14" />
    </svg>
  )
}

// IllustrationTwo

function createPixelPaths(matrix) {
  let primaryPaths = ''
  let secondaryPaths = ''

  for (const [rowIndex, row] of matrix.entries()) {
    if (!row) continue

    for (const [columnIndex, cell] of row.entries()) {
      if (cell === 0) continue

      const x = columnIndex + 0.5
      const y = rowIndex + 0.5
      const dotPath = `M${x} ${y}m-0.35,0a0.35,0.35 0 1,0 0.7,0a0.35,0.35 0 1,0 -0.7,0`

      if (cell === 1 || cell === 3) {
        primaryPaths += dotPath
      } else if (cell === 2) {
        secondaryPaths += dotPath
      }
    }
  }

  return { primaryPaths, secondaryPaths }
}

const messageMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const { primaryPaths: messagePrimaryPaths, secondaryPaths: messageSecondaryPaths } =
  createPixelPaths(messageMatrix)

const messageIconData = {
  label: 'Message',
  primaryPaths: messagePrimaryPaths,
  secondaryPaths: messageSecondaryPaths,
  matrix: messageMatrix,
  gridWidth: 24,
  gridHeight: 24,
}

function PixelIcon({ generated, size, color = 'currentColor', colorSecondary, className, style }) {
  const { label, primaryPaths, secondaryPaths, gridWidth, gridHeight } = generated

  return (
    <div
      role="img"
      aria-label={label}
      className={className}
      style={{ width: size, height: size, ...style }}
      data-slot="geist-pixel-icon"
    >
      <svg viewBox={`0 0 ${gridWidth} ${gridHeight}`}>
        {primaryPaths ? <path d={primaryPaths} fill={color} /> : null}
        {secondaryPaths ? (
          <path
            d={secondaryPaths}
            fill={colorSecondary || color}
            opacity={colorSecondary ? 1 : 0.5}
          />
        ) : null}
      </svg>
    </div>
  )
}

export function MessagePixelIcon(props) {
  return <PixelIcon generated={messageIconData} {...props} />
}

export function IllustrationTwo() {
  return <MessagePixelIcon />
}

// IllustrationTwo

const BookIllustrations = () => (
  <div className="flex flex-row items-stretch justify-start gap-8 flex-initial">
    <Book illustration={<IllustrationOne />} title={bookTitle} />
    <Book illustration={<IllustrationTwo />} title={bookTitle} variant="simple" />
  </div>
)

const BookResponsive = () => (
  <Book
    title={bookTitle}
    width={{
      sm: 150,
      md: 196,
    }}
  />
)

const BookSizes = () => (
  <div className="flex flex-row items-baseline justify-start gap-8 flex-initial">
    <Book title={bookTitle} width={300} />
    <Book title={bookTitle} width={200} />
    <Book title={bookTitle} width={150} />
  </div>
)

const BookTextured = () => (
  <div className="flex flex-col items-stretch justify-start gap-12 flex-initial">
    <div className="flex flex-row items-baseline justify-start gap-8 flex-initial">
      <Book color="#7DC1C1" textured title={designTitle} />
      <Book color="#9D2127" textured title={designTitle} />
      <Book color="#FED954" textured title={designTitle} />
    </div>

    <div className="flex flex-row items-baseline justify-start gap-8 flex-initial">
      <Book color="#7DC1C1" textColor="white" textured title={designTitle} variant="simple" />
      <Book color="#9D2127" textColor="#ece4db" textured title={designTitle} variant="simple" />
      <Book color="#FED954" textColor="#9d3b05" textured title={designTitle} variant="simple" />
    </div>
  </div>
)

const BookVariants = () => (
  <div className="flex flex-row items-baseline justify-start gap-8 flex-initial">
    <Book title={bookTitle} variant="simple" width={196} />
    <Book title={bookTitle} variant="stripe" width={196} />
  </div>
)

const examples = {
  'book-colors': {
    name: 'book-colors',
    component: BookColors,
  },
  'book-default': {
    name: 'book-default',
    component: BookDefault,
  },
  'book-illustrations': {
    name: 'book-illustrations',
    component: BookIllustrations,
  },
  'book-responsive': {
    name: 'book-responsive',
    component: BookResponsive,
  },
  'book-sizes': {
    name: 'book-sizes',
    component: BookSizes,
  },
  'book-textured': {
    name: 'book-textured',
    component: BookTextured,
  },
  'book-variants': {
    name: 'book-variants',
    component: BookVariants,
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
