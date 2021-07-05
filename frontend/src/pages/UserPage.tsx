import UpdateForm from '../components/user/UpdateForm'
import PageHeader from '../components/util/PageHeader'

interface Props {}

const UserPage = (props: Props) => {
	return (
		<>
			<PageHeader>User page</PageHeader>

			<UpdateForm />
		</>
	)
}

export default UserPage
