import {
  Avatar,
  AvatarGroup,
  BitbucketAvatar,
  GitHubAvatar,
  GitLabAvatar,
  Preview,
} from '@/geist/components'

const examples = {
  'avatar-base': {
    name: 'avatar-base',
    component: () => {
      return (
        <div className="flex flex-col items-stretch justify-start gap-3.5 flex-initial">
          <Avatar size={32} username="evilrabbit" />

          <AvatarGroup
            members={[{ username: 'emilkowalski' }, { username: 'skllcrn' }]}
            size={32}
          />

          <AvatarGroup
            limit={4}
            members={[
              { username: 'rauchg' },
              { username: 'rauno' },
              { username: 'shuding' },
              { username: 'skllcrn' },
              { username: 'almonk' },
            ]}
            size={32}
          />
        </div>
      )
    },
  },

  // 'avatar-custom-icon': {
  //   name: 'avatar-custom-icon',
  //   component: () => {
  //     return (
  //       <div className="flex flex-col items-stretch justify-start gap-3.5 flex-initial">
  //         <AvatarWithIcon
  //           icon={<ArrowCircleDown size={14} color="gray-900" />}
  //           size={32}
  //           iconBackground
  //         />

  //         <AvatarWithIcon
  //           icon={<CheckCircleFill size={14} color="gray-900" />}
  //           size={32}
  //           iconBackground
  //         />

  //         <AvatarWithIcon
  //           icon={<ClockDashed size={14} color="gray-900" />}
  //           size={32}
  //           iconBackground
  //         />
  //       </div>
  //     )
  //   },
  // },

  'avatar-git': {
    name: 'avatar-git',
    component: () => {
      return (
        <div className="flex flex-col items-stretch justify-start gap-4 flex-initial">
          <GitHubAvatar size={32} username="rauchg" />
          <GitLabAvatar size={32} username="leerob" />
          <BitbucketAvatar size={32} username="evilrabbit" />
        </div>
      )
    },
  },

  'avatar-group': {
    name: 'avatar-group',
    component: () => {
      return (
        <div className="flex flex-col items-stretch justify-start gap-4 flex-initial">
          <AvatarGroup
            members={[{ username: 'evilrabbit' }, { username: 'leerob' }, { username: 'rauchg' }]}
            size={32}
          />

          <AvatarGroup
            limit={4}
            members={[
              { username: 'sambecker' },
              { username: 'rauno' },
              { username: 'shuding' },
              { username: 'skllcrn' },
              { username: 'almonk' },
            ]}
            size={32}
          />
        </div>
      )
    },
  },

  'avatar-placeholder': {
    name: 'avatar-placeholder',
    component: () => {
      return <Avatar placeholder size={90} />
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
