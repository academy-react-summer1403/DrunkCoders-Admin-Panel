import React from 'react';
import { Controller } from 'react-hook-form';
import { Button, Col, Form, Input, Label, Row } from 'reactstrap';

export default function LevelForm({ control, errors, handleSubmit, onSubmit }) {
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md="6" className="mb-1">
          <Label className="form-label fs-5" for="levelId">
            آیدی سطح جدید
          </Label>
          <Controller
            id="id"
            name="id"
            control={control}
            rules={{
              required: 'نمی‌تواند خالی باشد',
              pattern: {
                value: /^[0-9]+$/,
                message: 'فقط عدد لاتین قابل قبول است',
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                className="text-right"
                invalid={errors.id && true}
              />
            )}
          />
          {errors.id && (
            <p
              className="text-danger"
              style={{ fontSize: '12px', marginTop: '4px' }}
            >
              {errors.id.message}
            </p>
          )}
        </Col>
        <Col md="6" className="mb-1">
          <Label className="form-label fs-5" for="levelName">
            نام سطح جدید
          </Label>
          <Controller
            id="levelName"
            name="levelName"
            control={control}
            rules={{
              required: 'نمی‌تواند خالی باشد',
            }}
            render={({ field }) => (
              <Input
                {...field}
                className="text-right"
                invalid={errors.levelName && true}
              />
            )}
          />
          {errors.levelName && (
            <p
              className="text-danger"
              style={{ fontSize: '12px', marginTop: '4px' }}
            >
              {errors.levelName.message}
            </p>
          )}
        </Col>
      </Row>
        <div className="d-flex justify-content-center mt-2">
              <Button type="submit" color="primary" className="fs-3 w-50">
              تایید
              </Button>
        </div>
    </Form>
  );
}
