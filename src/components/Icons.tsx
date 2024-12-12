import React from 'react'
import type { PropsWithChildren } from 'react'

import { FontAwesome } from '@expo/vector-icons'

type IconsProps = PropsWithChildren<{
    name: string;
}>

const Icons = ({ name }: IconsProps) => {
  switch (name) {
    case 'circle':
      return <FontAwesome name="circle-thin" size={38} color="#F7CD2E" />
      break;
    case 'cross':
      return <FontAwesome name="times" size={38} color="#38CC77" />
      break;
    default:
      return <FontAwesome name="pencil" size={38} color="#0D0D0D" />
  }
}

export default Icons
