import { useMemo } from 'react'

const messageDictionaryCache = new WeakMap()

export function useMessageFormatter(messagesByLocale) {
  const { locale } = useLocale()

  const messageDictionary = useMemo(() => {
    let dictionary = messageDictionaryCache.get(messagesByLocale)

    if (!dictionary) {
      dictionary = new MessageDictionary(messagesByLocale)
      messageDictionaryCache.set(messagesByLocale, dictionary)
    }

    return dictionary
  }, [messagesByLocale])

  const formatter = React.useMemo(() => {
    return new MessageFormatter(locale, messageDictionary)
  }, [locale, messageDictionary])

  return React.useCallback(
    (messageKey, values) => formatter.format(messageKey, values),
    [formatter]
  )
}
