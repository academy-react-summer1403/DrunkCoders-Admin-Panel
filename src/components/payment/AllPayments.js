import { CustomPagination } from '@Components/common/CustomPagination';
import { acceptCoursePayment, getCoursesPayments } from '@core/services/api/payment'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import toast from 'react-hot-toast';
import { Badge, Button, Card, Spinner } from 'reactstrap';
import {CustomHeader} from '@Components/courses/reserve/CustomHeader'
import { ModalPayment } from './ModalPayment';
import { columnsConfig } from './columnsConfig';


function AllPayments() {
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerpage] = useState(10)
    const [searchTerm, setSearchTerm] = useState(null)
    const [centeredModal, setCenteredModal] = useState(false)
    const [selectedPayment, setSelectedPayment] = useState(null);

    function handleOpenModal(payment) {
        setSelectedPayment(payment); // Set the selected payment data
        setCenteredModal(true); // Open the modal
    }
    const { data:coursesPayment, isLoading, isError}= useQuery({
        queryKey:['course_allPayments'],
        queryFn: getCoursesPayments
    })
    const{mutate ,isPending, isError:mutateError} = useMutation({
        mutationFn: acceptCoursePayment,
        onSuccess: (response) =>{
            if(response.success){
                toast.success(' پرداخت پذیرفته شد '+ response.message)
            } else{
                toast.error(' پذیرش ناموفق ')
            }
        },
        onError: (err)=>{
            console.log('response', err);
            toast.error(' پذیرش ناموفق ')
        }

    })
    let filteredReserves = coursesPayment ? [...coursesPayment] : []
    if (searchTerm && searchTerm?.trim().length !== 0) {
        filteredReserves = coursesPayment.filter(
            item =>
                item.studentName?.includes(searchTerm) ||
                item.groupName?.includes(searchTerm) ||
                item.title?.includes(searchTerm)
        )
    }
    const handlePagination = page => {
        setCurrentPage(page.selected + 1)
    }
    function handlePerPage(e) {
        const value = parseInt(e.currentTarget.value)
        setRowsPerpage(value)
    }
    function dataToRender() {
        if (coursesPayment) {
            const allData = [...filteredReserves]

            return allData?.filter(
                (_, index) =>
                    index >= (currentPage - 1) * rowsPerPage && index < currentPage * rowsPerPage
            )
        }
    }

    function handleSearch(val) {
        setSearchTerm(val)
        setCurrentPage(1)
    }

    function handleAccept(paymentId) {
        const formData = new FormData();
        formData.append('PaymentId', paymentId)

        mutate(formData)
    }
    function Pagination() {
        return (
            <>
                <CustomPagination
                    totalItem={filteredReserves.length}
                    rowsPerPage={rowsPerPage}
                    currentPage={currentPage}
                    handlePagination={handlePagination}
                />
            </>
        )
    }

  return (
    <Card>
    <div className="react-dataTable">
        <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            className="react-dataTable"
            columns={columnsConfig(handleAccept,handleOpenModal)}
            progressPending={isLoading}
            progressComponent={<Spinner color="primary" size='md'/>}
            noDataComponent={<div style={{padding: '20px'}}> پرداختی ای موجود نیست</div>}
            data={dataToRender()}
            paginationComponent={Pagination}
            subHeaderComponent={
                <CustomHeader
                    RowsOfPage={rowsPerPage}
                    handlePerPage={handlePerPage}
                    onSearch={handleSearch}
                    title="دسته‌بندی"
                />
            }
        />
    </div>
    <ModalPayment
    centeredModal={centeredModal}
    setCenteredModal={setCenteredModal}
    modalData={selectedPayment}
    />
    </Card>
  )
}

export default AllPayments