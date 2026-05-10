import { memo } from 'react'
import AvatarWithIcon from './AvatarWithIcon'
import { LogoGithub } from '../@vercel/icons/LogoGithub'

function GitHubAvatar({
  username,
  size = 30,
  showIcon = true,
  iconSize = 14,
  iconBackground = true,
  icon = <LogoGithub className="text-[#000000]" height={iconSize} width={iconSize} />,
  lazy = false,
  ...avatarProps
}) {
  const githubUsername = username || '404'
  const cleanUsername = githubUsername.replace('[bot]', '')
  const src = `https://avatars.githubusercontent.com/${cleanUsername}?s=${2 * size}`

  return (
    <AvatarWithIcon
      gitType="github"
      icon={showIcon ? icon : null}
      iconBackground={iconBackground}
      lazy={lazy}
      size={size}
      src={src}
      {...avatarProps}
    />
  )
}

GitHubAvatar.displayName = 'GitHubAvatar'

export default memo(GitHubAvatar)
