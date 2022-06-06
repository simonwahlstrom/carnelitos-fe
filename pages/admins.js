import { useEffect, useState } from "react"
import Admins from "../src/components/admins/admins"
import Layout from "../src/components/shared/layout"
import Skeleton from "../src/components/shared/skeleton"
import { GetAdminData } from "../src/services/admin-service"
export default function admins() {
  const [data, setData] = useState(undefined)

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetAdminData()
      setData(result)
    }
    fetchData()
  }, [])

  if (!data) {
    return <Skeleton />
  }

  return (
    <Layout>
      <Admins
        users={data.users}
        workouts={data.workouts}
        exercises={data.exercises}
        all_exercises={data.all_exercises}
      />
    </Layout>
  )
}
