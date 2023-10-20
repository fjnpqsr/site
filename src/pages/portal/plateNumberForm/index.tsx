import {Form} from 'antd'
import React, {FC} from 'react';

import PageContainer from '@/components/PageContainer';
import PlateFormInput from '@/components/PlateNumberInput';

const FormItem =Form.Item

interface PlateFormTestProps {
    onChange?: () => void
}

const PlateFormTest:FC<PlateFormTestProps> = (props) => {
    console.log({props})
    return (
        <PageContainer>
            <Form>
                <FormItem>
                    <PlateFormInput />
                </FormItem>
            </Form>
        </PageContainer>
    )
}

export default PlateFormTest