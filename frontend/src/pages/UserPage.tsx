import UpdateForm from '../components/user/updateProfile/UpdateForm'
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
