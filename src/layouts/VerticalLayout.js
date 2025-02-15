// ** React Imports
import {Outlet} from 'react-router-dom'

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

// ** Menu Items Array
import navigation from '@src/navigation/vertical'
import PrivateRoute from '../@core/components/routes/PrivateRoute'

const VerticalLayout = props => {
    // const [menuData, setMenuData] = useState([])

    // ** For ServerSide navigation
    // useEffect(() => {
    //   axios.get(URL).then(response => setMenuData(response.data))
    // }, [])

    return (
        <PrivateRoute>
            <Layout menuData={navigation} {...props}>
                <Outlet />
            </Layout>
        </PrivateRoute>
    )
}

export default VerticalLayout
