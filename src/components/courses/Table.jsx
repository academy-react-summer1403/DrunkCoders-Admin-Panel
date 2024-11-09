import ReactPaginate from 'react-paginate'
import {useQuery} from '@tanstack/react-query'
import {getAllCourses, getCreateCourseStep1} from '../../@core/services/api/courses'
import {useCallback, useRef, useState} from 'react'
import DataTable from 'react-data-table-component'
import {Button, Card, Col, Input, Modal, ModalBody, ModalHeader, Row, Spinner} from 'reactstrap'
import {Columns} from './TableColumns'
import {ChevronDown} from 'react-feather'

import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import {FormWizard} from './formWizard/formWizard'

export function Table() {
    const timeout = useRef(null)
    const [params, setParams] = useState({PageNumber: 1, RowsOfPage: 10, Query: ''})
    const [show, setShow] = useState(false)

    const {data: courses, isLoading} = useQuery({
        queryKey: ['allCourses', params],
        queryFn: () => getAllCourses(params),
    })

    const handlePagination = page => {
        setParams(prevState => ({...prevState, PageNumber: page.selected + 1}))
    }

    const handleSearch = val => {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }

        timeout.current = setTimeout(() => {
            setParams(prevState => ({...prevState, Query: val}))
            params.current = {...params.current, Query: val}
            timeout.current = null
        }, 1000)
    }

    /* const dataToRender = () => {
        const filters = {
            role: currentRole.value,
            currentPlan: currentPlan.value,
            status: currentStatus.value,
            q: searchTerm,
        }
         const isFiltered = Object.keys(filters).some(function (k) {
            return filters[k].length > 0
        })
        if (store.data.length > 0) {
            return store.data
        } else if (store.data.length === 0 && isFiltered) {
            return []
        } else {
            return store.allData.slice(0, rowsPerPage)
        }
    } */

    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setParams(prevState => ({...prevState, RowsOfPage: value}))
    }

    const CustomHeader = useCallback(
        ({handlePerPage, RowsOfPage, handleSearch, currentSearchTerm}) => {
            return (
                <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
                    <Row>
                        <Col
                            xl="6"
                            className="d-flex align-items-sm-center justify-content-xl-start justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
                        >
                            <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
                                <label className="mb-0" htmlFor="search-invoice">
                                    جستوجو:
                                </label>
                                <Input
                                    id="search-invoice"
                                    className="ms-50 w-100"
                                    type="text"
                                    // value={currentSearchTerm}
                                    onChange={e => handleSearch(e.target.value)}
                                />
                            </div>
                        </Col>
                        <Col
                            xl="6"
                            className="d-flex gap-5 align-items-center justify-content-start justify-content-xl-end p-0 mt-2 mt-xl-0"
                        >
                            <div className="d-flex align-items-center  ">
                                <label htmlFor="rows-per-page">تعداد</label>
                                <Input
                                    className="mx-50"
                                    type="select"
                                    id="rows-per-page"
                                    value={RowsOfPage}
                                    onChange={handlePerPage}
                                    style={{width: '5rem'}}
                                >
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                </Input>
                                <label htmlFor="rows-per-page">دوره در صفحه</label>
                            </div>

                            <Button
                                className="add-new-user"
                                color="primary"
                                onClick={() => setShow(prevS => !prevS)}
                            >
                                ایجاد دوره جدید
                            </Button>
                        </Col>
                    </Row>
                </div>
            )
        },
        []
    )

    const CustomPagination = () => {
        const count = Number(Math.ceil(courses?.totalCount / params.RowsOfPage))

        return (
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                pageCount={count || 1}
                activeClassName="active"
                forcePage={params.PageNumber !== 0 ? params.PageNumber - 1 : 0}
                onPageChange={page => handlePagination(page)}
                pageClassName={'page-item'}
                nextLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousClassName={'page-item prev'}
                previousLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                containerClassName={'pagination react-paginate justify-content-center my-2 pe-1'}
            />
        )
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
                        columns={Columns}
                        // onSort={handleSort}
                        sortIcon={<ChevronDown />}
                        className="react-dataTable"
                        paginationComponent={CustomPagination}
                        data={/* dataToRender() */ courses?.courseDtos}
                        subHeaderComponent={
                            <CustomHeader
                                // store={store}
                                currentSearchTerm={params.Query}
                                RowsOfPage={params.RowsOfPage}
                                handleSearch={handleSearch}
                                handlePerPage={handlePerPage}
                                // toggleSidebar={toggleSidebar}
                            />
                        }
                    />
                </div>
            </Card>

            <FormWizard />

            <Modal
                isOpen={show}
                toggle={() => setShow(!show)}
                className="modal-dialog-centered modal-xl "
            >
                <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}></ModalHeader>
                <ModalBody className="px-sm-5 mx-50" style={{paddingBottom: 100}}>
                    <FormWizard />
                </ModalBody>
            </Modal>
        </>
    )
}
