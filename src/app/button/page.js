import { ArrowLeft } from '@/geist/@vercel/icons/ArrowLeft'
import { ArrowRight } from '@/geist/@vercel/icons/ArrowRight'
import { Button, Preview, ButtonLink } from '@/geist/components'

const buttonExamples = {
  'button-disabled': {
    name: 'button-disabled',
    component: function ButtonDisabledExample() {
      return (
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 flex-initial">
          <Button disabled size="small">
            Upload
          </Button>
          <Button disabled>Upload</Button>
          <Button disabled size="large">
            Upload
          </Button>
        </div>
      )
    },
  },

  'button-link': {
    name: 'button-link',
    component: function ButtonLinkExample() {
      return (
        <ButtonLink className="w-fit" href="/">
          Sign Up
        </ButtonLink>
      )
    },
  },

  'button-loading': {
    name: 'button-loading',
    component: function ButtonLoadingExample() {
      return (
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 flex-initial">
          <Button loading size="small">
            Upload
          </Button>
          <Button loading>Upload</Button>
          <Button loading size="large">
            Upload
          </Button>
        </div>
      )
    },
  },

  'button-prefix-suffix': {
    name: 'button-prefix-suffix',
    component: function ButtonPrefixSuffixExample() {
      return (
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 flex-initial">
          <Button prefix={<ArrowLeft />}>Upload</Button>
          <Button suffix={<ArrowRight />}>Upload</Button>
          <Button prefix={<ArrowLeft />} suffix={<ArrowRight />}>
            Upload
          </Button>
        </div>
      )
    },
  },

  'button-rounded': {
    name: 'button-rounded',
    component: function ButtonRoundedExample() {
      return (
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 flex-initial">
          <Button shadow shape="rounded" size="small" type="secondary">
            Upload
          </Button>
          <Button shadow shape="rounded" type="secondary">
            Upload
          </Button>
          <Button shadow shape="rounded" size="large" type="secondary">
            Upload
          </Button>
        </div>
      )
    },
  },

  'button-sizes': {
    name: 'button-sizes',
    component: function ButtonSizesExample() {
      return (
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 flex-initial">
          <Button size="small">Upload</Button>
          <Button>Upload</Button>
          <Button size="large">Upload</Button>
        </div>
      )
    },
  },
}

export default function ButtonPage() {
  return (
    <div className="flex flex-col items-start justify-start gap-8">
      {Object.values(buttonExamples).map(({ name }) => (
        <div key={name} className="flex flex-col items-start justify-start gap-4">
          <h2 className="text-lg font-medium">{name}</h2>
          <Preview componentRegistry={buttonExamples} name={name} />
        </div>
      ))}
    </div>
  )
}
