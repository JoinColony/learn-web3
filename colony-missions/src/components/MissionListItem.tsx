import Link from 'next/link'
import clsx from 'clsx'

import { Mission } from '@prisma/client'

import styles from '@/styles/MissionListItem.module.css'

interface Props {
  mission: Mission,
}

export default function MissionListItem ({ mission }: Props) {
  return (
    <Link
      className={clsx(styles.mission, {
        [styles.paid]: mission.paid,
        [styles.done]: mission.txHash,
        [styles.pending]: !mission.txHash && mission.worker
      })}
      href={`/missions/${mission.colony}/${mission.id}`}
    >
      {mission.title}
    </Link>
  );
}
