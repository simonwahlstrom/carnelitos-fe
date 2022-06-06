import React from "react"
import { List } from "antd"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Workouts from "./workouts/workouts"
import Exercises from "./exercises/exercises"
import { GetAdminData, LoginAsUser } from "../../services/admin-service"
import { StoreToken } from "../../services/login-service"
import Skeleton from "../shared/skeleton"

export default function Admins() {
  const [data, setData] = useState(undefined)

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetAdminData()
      setData(result)
    }
    fetchData()
  }, [])

  async function loginUser(id) {
    const data = await LoginAsUser(id)
    StoreToken(data.token)
    window.location = "/"
  }

  if (!data) {
    return <Skeleton />
  }

  return (
    <Tabs defaultIndex={0}>
      <TabList>
        <Tab key="1">Users</Tab>
        <Tab key="2">Workouts</Tab>
        <Tab key="3">Exercises</Tab>
      </TabList>

      <TabPanel key="1">
        <div className="container">
          <List
            size="small"
            header={<div>Users</div>}
            bordered
            dataSource={data.users}
            renderItem={item => <List.Item><a onClick={async () => loginUser(item.id)}>{item.email}</a></List.Item>}
          />
        </div>
      </TabPanel>

      <TabPanel key="2">
        <div className="container">
          <Workouts workouts={data.workouts} all_exercises={data.all_exercises} />
        </div>
      </TabPanel>

      <TabPanel key="3">
        <div className="container">
          <Exercises exercises={data.exercises} />
        </div>
      </TabPanel>
    </Tabs>
  )
}
