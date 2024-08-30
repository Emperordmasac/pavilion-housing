import { BsSnow } from 'react-icons/bs'
import { IoDiamond } from 'react-icons/io5'
import { MdOutlineVilla } from 'react-icons/md'
import { FaSkiing } from 'react-icons/fa'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi'
import { categoriesInterface } from '@/types'

export const categories: categoriesInterface[] = [
  {
    label: 'Beach',
    description: 'This property is close the beach',
    icon: TbBeach,
  },
  {
    label: 'Windmill',
    description: 'This property has windmills',
    icon: GiWindmill,
  },
  {
    label: 'Modern',
    description: 'This property has state of the art facilities',
    icon: MdOutlineVilla,
  },
  {
    label: 'Countryside',
    description: 'This property is in the countryside',
    icon: TbMountain,
  },
  {
    label: 'Islands',
    description: 'This property is on an Island',
    icon: GiIsland,
  },
  {
    label: 'Pools',
    description: 'This property has a pool',
    icon: TbPool,
  },
  {
    label: 'Lake',
    description: 'This property is located near a lake',
    icon: GiBoatFishing,
  },
  {
    label: 'Skiing',
    description: 'This property has skiing activities',
    icon: FaSkiing,
  },
  {
    label: 'Castle',
    description: 'This property is in a castle',
    icon: GiCastle,
  },
  {
    label: 'Camping',
    description: 'This property has camping activities',
    icon: GiForestCamp,
  },
  {
    label: 'Arctic',
    description: 'This property is located near the arctic',
    icon: BsSnow,
  },
  {
    label: 'Cave',
    description: 'This property is in a cave',
    icon: GiCaveEntrance,
  },
  {
    label: 'Desert',
    description: 'This property is in the desert',
    icon: GiCactus,
  },
  {
    label: 'Barns',
    description: 'This property is in a barn',
    icon: GiBarn,
  },
  {
    label: 'Lux',
    description: 'This property is located near the arctic',
    icon: IoDiamond,
  },
]
