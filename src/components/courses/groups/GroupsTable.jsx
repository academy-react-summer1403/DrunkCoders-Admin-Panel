import DataTable from 'react-data-table-component'
import {Card, Spinner} from 'reactstrap'

import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import {getAllCoursesGroups} from '@core/services/api/courses'
import {useRef, useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import {useGroupsColumn} from './useGroupsColumn'
import {ChevronDown} from 'react-feather'
import {CustomPagination} from '@Components/common/CustomPagination'
import {CustomHeader} from '../CustomHeader'
import {CreateGroupModal} from './CreateGroupModal'

export function GroupsTable() {
    const currentCourse = useRef(null)
    const [params, setParams] = useState({PageNumber: 1, RowsOfPage: 10, Query: ''})
    const [show, setShow] = useState(false)
    // const [currentCourse, setCurrentCourse] = useState()
    const columns = useGroupsColumn({setCurrentCourse, params})

    function setCurrentCourse(course) {
        currentCourse.current = course
        handleToggleModal()
    }

    async function handleToggleModal() {
        setShow(prevS => !prevS)
        if (show) {
            setTimeout(() => {
                currentCourse.current = null
            }, 500)
        }
    }

    const {data: groups, isLoading} = useQuery({
        queryKey: ['all-groups', params],
        queryFn: () => getAllCoursesGroups(params),
    })

    const handlePagination = page => {
        setParams(prevState => ({...prevState, PageNumber: page.selected + 1}))
    }

    function Pagination() {
        return (
            <CustomPagination
                totalItem={groups?.totalCount}
                rowsPerPage={params.RowsOfPage}
                currentPage={params.PageNumber}
                handlePagination={handlePagination}
            />
        )
    }

    function handleSearch(val) {
        setParams(prevState => ({...prevState, Query: val, PageNumber: 1}))
    }

    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setParams(prevState => ({...prevState, RowsOfPage: value}))
    }

    return (
        <>
            <Card className="overflow-hidden">
                <div className="react-dataTable">
                    <DataTable
                        noHeader
                        subHeader
                        sortServer
                        pagination
                        responsive
                        paginationServer
                        progressPending={isLoading}
                        noDataComponent={
                            <span className="my-4 fs-2 text-primary">دیتایی وجود ندارد</span>
                        }
                        progressComponent={<Spinner className="mb-5 mt-4" color="primary" />}
                        columns={columns}
                        sortIcon={<ChevronDown />}
                        className="react-dataTable"
                        paginationComponent={Pagination}
                        data={groups?.courseGroupDtos}
                        subHeaderComponent={
                            <CustomHeader
                                RowsOfPage={params.RowsOfPage}
                                handlePerPage={handlePerPage}
                                buttonText="ایجاد گروه جدید"
                                pageTitle="گروه"
                                onSearch={handleSearch}
                                handleToggleModal={handleToggleModal}
                            />
                        }
                    />
                </div>
            </Card>
            <CreateGroupModal
                handleToggleModal={handleToggleModal}
                show={show}
                course={currentCourse.current}
                params={params}
            />
        </>
    )
}