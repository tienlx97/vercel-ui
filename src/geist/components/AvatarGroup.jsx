import React, { memo } from 'react'
import clsx from 'clsx'
import Avatar from './Avatar'
import styles from '@/geist/css/group.module.css'
import GitHubAvatar from './GitHubAvatar'
import GitLabAvatar from './GitLabAvatar'
import BitbucketAvatar from './BitbucketAvatar'
import { Text } from './Text'

function GroupAvatar({ member, size, showIcon, iconBackground, lazy = false }) {
  if ('teamId' in member) {
    return (
      <Avatar
        lazy={lazy}
        size={size}
        teamId={member.teamId}
        title={member.teamName}
        key={member.teamId}
      />
    )
  }

  if (member.githubUser) {
    return (
      <span title={member.name}>
        <GitHubAvatar
          iconBackground={iconBackground}
          lazy={lazy}
          showIcon={showIcon}
          size={size}
          username={member.username}
        />
      </span>
    )
  }

  if (member.gitlabUser) {
    return (
      <span title={member.name}>
        <GitLabAvatar
          iconBackground={iconBackground}
          lazy={lazy}
          showIcon={showIcon}
          size={size}
          url={member.url}
        />
      </span>
    )
  }

  if (member.bitbucketUser) {
    return (
      <span title={member.name}>
        <BitbucketAvatar
          iconBackground={iconBackground}
          lazy={lazy}
          showIcon={showIcon}
          size={size}
          url={member.url}
        />
      </span>
    )
  }

  if (member.username) {
    return <Avatar size={size} username={member.username} />
  }

  if (member.url) {
    return <Avatar size={size} url={member.url} />
  }

  return <Avatar size={size} uid={member.uid} />
}

GroupAvatar.displayName = 'GroupAvatar'

function AvatarGroup({
  members,
  limit = 3,
  extra = 0,
  size = 24,
  showIcon = false,
  iconBackground = true,
  ariaHidden,
  lazy = false,
}) {
  if (limit === 0) {
    limit = members.length
  }

  const visibleLimit = limit - 1
  const visibleMembers = members.slice(0, visibleLimit)
  const overflowMembers = members.slice(visibleLimit)

  const hiddenCount = overflowMembers.length + extra
  const hiddenLabel = hiddenCount > 9 ? '9+' : `+${hiddenCount}`
  const accessibilityLabel = `${hiddenCount} more avatars in this group`

  return (
    <div aria-hidden={ariaHidden} className={styles.group}>
      {visibleMembers.map((member) => (
        <span
          className={styles.avatar}
          key={'teamId' in member ? member.teamId : member.uid || member.username || member.url}
        >
          {'component' in member ? (
            member.component
          ) : (
            <GroupAvatar
              member={member}
              size={size}
              showIcon={showIcon}
              iconBackground={iconBackground}
              lazy={lazy}
            />
          )}
        </span>
      ))}

      {overflowMembers.length > 0 || extra > 0 ? (
        <span
          aria-label={accessibilityLabel}
          className={clsx(styles.note, {
            [styles.avatar || '']: overflowMembers.length,
          })}
          title={accessibilityLabel}
        >
          {overflowMembers.length > 0 ? (
            'component' in overflowMembers[0] ? (
              overflowMembers[0].component
            ) : (
              <GroupAvatar
                member={overflowMembers[0]}
                size={size}
                showIcon={showIcon}
                iconBackground={iconBackground}
                lazy={lazy}
              />
            )
          ) : null}

          {hiddenCount > 1 ? (
            <Text
              as="span"
              className={clsx(styles.noteText, 'dark-theme')}
              color="gray-1000"
              size={10}
              weight={600}
            >
              {hiddenLabel}
            </Text>
          ) : null}
        </span>
      ) : null}
    </div>
  )
}

AvatarGroup.displayName = 'AvatarGroup'

export default memo(AvatarGroup)
