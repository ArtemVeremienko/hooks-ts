import { Dispatch, SetStateAction, useState } from 'react'

interface ReturnType {
  value: boolean
  setValue: Dispatch<SetStateAction<boolean>>
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
}

const useBoolean = (defaultValue?: boolean): ReturnType => {
  const [value, setValue] = useState(Boolean(defaultValue))

  const setTrue = () => setValue(true)
  const setFalse = () => setValue(false)
  const toggle = () => setValue( x => !x)

  return {value, setValue, setTrue, setFalse, toggle}
}

export default useBoolean
