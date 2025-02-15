// ** React Imports
import {Fragment, lazy} from 'react'
import {Navigate} from 'react-router-dom'
// ** Layouts
import BlankLayout from '@layouts/BlankLayout'
import VerticalLayout from '@src/layouts/VerticalLayout'
import HorizontalLayout from '@src/layouts/HorizontalLayout'
import LayoutWrapper from '@src/@core/layouts/components/layout-wrapper'

// ** Route Components
import PublicRoute from '@components/routes/PublicRoute'

// ** Utils
import {isObjEmpty} from '@utils'

const getLayout = {
    blank: <BlankLayout />,
    vertical: <VerticalLayout />,
    horizontal: <HorizontalLayout />,
}

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/home'

const Home = lazy(() => import('../../pages/Home'))
const Login = lazy(() => import('../../pages/Login'))
const Register = lazy(() => import('../../pages/Register'))
const ForgotPassword = lazy(() => import('../../pages/ForgotPassword'))
const Error = lazy(() => import('../../pages/Error'))
const Courses = lazy(() => import('../../pages/course/Courses'))
const CourseDetail = lazy(() => import('../../pages/course/CourseDetail'))
const CreateCourse = lazy(() => import('../../pages/course/CreateCourse'))
const AllReserves = lazy(() => import('../../pages/course/AllReserves'))
const AllGroups = lazy(() => import('../../pages/course/AllGroups'))
const Assistance = lazy(() => import('../../pages/course/Assistance'))
const AssistanceWork = lazy(() => import('../../pages/course/AssistanceWork'))
const CourseGeneral = lazy(() => import('../../pages/course/General.js'))
const UserList = lazy(() => import('../../pages/UserList'))
const UserView = lazy(() => import('../../pages/UserDetail'))
const ManageComments = lazy(() => import('../../pages/AdminCommentMng'))
const AllArticles = lazy(() => import('../../pages/articles/AllArticles'))
const CreateArticle = lazy(() => import('../../pages/articles/CreateArticle'))
const ArticleDetails = lazy(() => import('../../pages/articles/ArticleDetails'))
const ArticleCategories = lazy(() => import('../../pages/articles/ArticleCategories'))
const CategoryDetail = lazy(() => import('../../pages/articles/CategoryDetail'))
const PaymentsPage = lazy(() => import('../../pages/Payments'))
const Buildings = lazy(() => import('../../pages/Buildings'))

// ** Merge Routes
const Routes = [
    {
        path: '/',
        index: true,
        element: <Navigate replace to={DefaultRoute} />,
    },
    {
        path: '/home',
        element: <Home />,
    },
    {
        path: '/courses',
        element: <Courses />,
    },
    {
        path: '/create-course',
        element: <CreateCourse />,
    },
    {
        path: '/courses-general',
        element: <CourseGeneral />,
    },
    {
        path: '/all-reserves',
        element: <AllReserves />,
    },
    {
        path: '/all-groups',
        element: <AllGroups />,
    },
    {
        path: '/courses/:id',
        element: <CourseDetail />,
    },
    {
        path: '/assistance',
        element: <Assistance />,
    },
    {
        path: '/assistance-work',
        element: <AssistanceWork />,
    },

    {
        path: '/all-articles',
        element: <AllArticles />,
    },
    {
        path: '/create-article',
        element: <CreateArticle />,
    },
    {
        path: '/article/:id',
        element: <ArticleDetails />,
    },
    {
        path: '/article-categories',
        element: <ArticleCategories />,
    },
    {
        path: '/article-category/:id',
        element: <CategoryDetail />,
    },
    {
        element: <UserView />,
        path: '/user/view/:id',
    },
    {
        element: <UserList />,
        path: '/user/list',
    },
    {
        element: <ManageComments />,
        path: '/comments-management',
    },
    {
        element: <PaymentsPage />,
        path: '/payments',
    },
    {
        path: '/buildings',
        element: <Buildings />,
    },
    {
        path: '/login',
        element: <Login />,
        meta: {
            layout: 'blank',
        },
    },
    {
        path: '/register',
        element: <Register />,
        meta: {
            layout: 'blank',
        },
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
        meta: {
            layout: 'blank',
        },
    },
    {
        path: '/error',
        element: <Error />,
        meta: {
            layout: 'blank',
        },
    },
    {
        path: '*',
        element: <Error />,
        meta: {
            layout: 'blank',
        },
    },
]

const getRouteMeta = route => {
    if (isObjEmpty(route.element.props)) {
        if (route.meta) {
            return {routeMeta: route.meta}
        } else {
            return {}
        }
    }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
    const LayoutRoutes = []

    if (Routes) {
        Routes.filter(route => {
            let isBlank = false
            // ** Checks if Route layout or Default layout matches current layout
            if (
                (route.meta && route.meta.layout && route.meta.layout === layout) ||
                ((route.meta === undefined || route.meta.layout === undefined) &&
                    defaultLayout === layout)
            ) {
                const RouteTag = PublicRoute

                // ** Check for public or private route
                if (route.meta) {
                    route.meta.layout === 'blank' ? (isBlank = true) : (isBlank = false)
                }
                if (route.element) {
                    const Wrapper =
                        // eslint-disable-next-line multiline-ternary
                        isObjEmpty(route.element.props) && isBlank === false
                            ? // eslint-disable-next-line multiline-ternary
                              LayoutWrapper
                            : Fragment

                    route.element = (
                        <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
                            <RouteTag route={route}>{route.element}</RouteTag>
                        </Wrapper>
                    )
                }

                // Push route to LayoutRoutes
                LayoutRoutes.push(route)
            }
            return LayoutRoutes
        })
    }
    return LayoutRoutes
}

const getRoutes = layout => {
    const defaultLayout = layout || 'vertical'
    const layouts = ['vertical', 'horizontal', 'blank']

    const AllRoutes = []

    layouts.forEach(layoutItem => {
        const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

        AllRoutes.push({
            path: '/',
            element: getLayout[layoutItem] || getLayout[defaultLayout],
            children: LayoutRoutes,
        })
    })
    return AllRoutes
}

export {DefaultRoute, TemplateTitle, Routes, getRoutes}
