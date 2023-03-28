import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

// import styles from '@/styles/Home.module.css'

interface Props {
  // user: {
  //   address: string,
  //   isAdmin: boolean,
  // },
}

export default function MissionView({ }: Props) {
  const router = useRouter()
  const { address, id } = router.query
  return (
    <>
      <Head>
        <title>View mission {id} for Colony {address}</title>
      </Head>
      <main className="container">
        <h1>View mission {id} for Colony {address}</h1>
        <p>
          <Link href={`/missions/${address}/${id}/apply`}>Apply</Link>
        </p>
        <h3>Bounty</h3>
        <p>500 DEAD</p>
        <h3>Description</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac tortor tincidunt, condimentum mauris id, faucibus leo. Donec in lacus eget ante semper rutrum sit amet ac ligula. In aliquet elit pretium dignissim congue. Etiam eget placerat metus, a aliquet massa. In placerat, massa quis convallis semper, risus quam commodo nisl, id faucibus nibh sem nec risus. Nullam mollis lectus vehicula, porta lorem a, fringilla nunc. Vestibulum quis mauris odio.<br />
          Vivamus ut hendrerit urna, quis malesuada leo. Duis tempor arcu orci, a faucibus elit cursus eu. Ut nibh sapien, ullamcorper ac quam eu, volutpat mattis est. Nunc sit amet justo odio. Morbi hendrerit vulputate dapibus. Maecenas convallis, lorem eget semper dictum, nunc ipsum aliquam enim, ut commodo orci eros a dui. In vitae aliquam libero, ac lobortis sapien. In vestibulum tortor et neque tincidunt, vel pharetra tortor imperdiet. Vivamus eleifend mi nulla, sit amet tempor justo mattis non. Etiam vel aliquet tellus, commodo consequat est. Mauris facilisis purus neque, in aliquet est malesuada ultricies. Duis et libero accumsan felis rhoncus euismod ac nec lacus. Proin dapibus condimentum leo vel condimentum. Suspendisse finibus augue et neque laoreet, eget dignissim dolor vehicula. In eget felis non libero egestas semper. In malesuada metus odio, sed placerat risus dictum quis.
        </p>
        <h3>Applicants</h3>
        <ul>
          <li>Daniel Craig</li>
          <li>Scarlett Johannsson</li>
          <li>Judge Dredd</li>
        </ul>
      </main>
    </>
  )
}
