import { Box } from '@chakra-ui/react'
import UpdateForm from '../components/user/UpdateForm'
import PageHeader from '../components/util/PageHeader'

interface Props {}

const UserPage = (props: Props) => {
	return (
		<>
			<PageHeader>User page</PageHeader>

			<Box>
				<UpdateForm />
			</Box>
		</>
	)
}

export default UserPage
