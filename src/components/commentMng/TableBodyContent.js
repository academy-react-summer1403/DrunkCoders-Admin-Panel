import React, {useState} from 'react'
import {useCommentActions} from './hooks/useCommentActions '
import {TableRow} from './TableRow'
import {EditCommentModal} from './EditCommentModal'
import {ReplyCommentModal} from './ReplyCommentModal'

export function TableBodyContent({List, singleCourse}) {
    const {acceptComment, rejectComment, deleteComment} = useCommentActions()
    const [formModal, setFormModal] = useState(false)
    const [editingComment, setEditingComment] = useState(null)
    const [replyComment, setReplyComment] = useState(null)

    const handleEditClick = comment => {
        setEditingComment(comment)
        setFormModal(true)
    }

    const handleReplyClick = comment => {
        setReplyComment(comment)
        setFormModal(true)
    }

    return (
        <>
            <tbody>
                {List.map((item, index) => (
                    <TableRow
                        singleCourse={singleCourse}
                        key={index}
                        comment={item}
                        onAccept={acceptComment.mutate}
                        onReject={rejectComment.mutate}
                        onEdit={handleEditClick}
                        onReply={handleReplyClick}
                        onDelete={deleteComment.mutate}
                    />
                ))}
            </tbody>
            {editingComment && (
                <EditCommentModal
                    formModal={formModal}
                    setFormModal={setFormModal}
                    comment={editingComment}
                />
            )}
            {replyComment && (
                <ReplyCommentModal
                    formModal={formModal}
                    setFormModal={setFormModal}
                    comment={replyComment}
                />
            )}
        </>
    )
}
