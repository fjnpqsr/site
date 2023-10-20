import { Form, Input, Space, Typography  } from 'antd';
import React, { FC, useState } from 'react';
const FormItem = Form.Item;

interface PlateFormInputProps {
    onChange?: () => void;
}
const { Paragraph } = Typography;
const NumberMappingTable = () => {
    return (
        <table border={1} style={{width: 250, height:'100%',margin: '0 12px'}} >
            <thead>
                <th>english</th>
                <th>arabic</th>
            </thead>
            <tbody>
                <tr><td><Paragraph copyable>٠</Paragraph></td><td>0</td></tr>
                <tr><td><Paragraph copyable>١</Paragraph></td><td>1</td></tr>
                <tr><td><Paragraph copyable>٢</Paragraph></td><td>2</td></tr>
                <tr><td><Paragraph copyable>٣</Paragraph></td><td>3</td></tr>
                <tr><td><Paragraph copyable>٤</Paragraph></td><td>4</td></tr>
                <tr><td><Paragraph copyable>٥</Paragraph></td><td>5</td></tr>
                <tr><td><Paragraph copyable>٦</Paragraph></td><td>6</td></tr>
                <tr><td><Paragraph copyable>٧</Paragraph></td><td>7</td></tr>
                <tr><td><Paragraph copyable>٨</Paragraph></td><td>8</td></tr>
                <tr><td><Paragraph copyable>٩</Paragraph></td><td>9</td></tr>
            </tbody>
        </table>
    )
}


const LetterMappingTable = () => {
    return (
        <table border={1} style={{width: 250, height: '100%'}} >
            <thead>
                <th>english</th>
                <th>arabic</th>
            </thead>
            <tbody>
                <tr><td><Paragraph copyable>أ</Paragraph></td><td>A</td></tr>
                <tr><td><Paragraph copyable>ب</Paragraph></td><td>B</td></tr>
                <tr><td><Paragraph copyable>ح</Paragraph></td><td>J</td></tr>
                <tr><td><Paragraph copyable>د</Paragraph></td><td>D</td></tr>
                <tr><td><Paragraph copyable>ر</Paragraph></td><td>R</td></tr>
                <tr><td><Paragraph copyable>س</Paragraph></td><td>S</td></tr>
                <tr><td><Paragraph copyable>ص</Paragraph></td><td>X</td></tr>
                <tr><td><Paragraph copyable>ط</Paragraph></td><td>T</td></tr>
                <tr><td><Paragraph copyable>غ</Paragraph></td><td>E</td></tr>
                <tr><td><Paragraph copyable>ق</Paragraph></td><td>G</td></tr>
                <tr><td><Paragraph copyable>ك</Paragraph></td><td>K</td></tr>
                <tr><td><Paragraph copyable>ل</Paragraph></td><td>L</td></tr>
                <tr><td><Paragraph copyable>م</Paragraph></td><td>Z</td></tr>
                <tr><td><Paragraph copyable>ن</Paragraph></td><td>N</td></tr>
                <tr><td><Paragraph copyable>ه</Paragraph></td><td>H</td></tr>
                <tr><td><Paragraph copyable>و</Paragraph></td><td>U</td></tr>
                <tr><td><Paragraph copyable>ي</Paragraph></td><td>V</td></tr>
            </tbody>
        </table>
    )
}


const PlateFormInput: FC<PlateFormInputProps> = (props) => {
    console.log({ props });
    const arabicNumberRegExp = /^[٠١٢٣٤٥٦٧٨٩]{0,4}$/;
    const arabicPlateLetterRegExp =/^[أبحدرسصصطغقكلمنهوي]{0,1}$/;
    const [plateString, setPlateString] = useState('')
    return (
        <div lang="ar" dir="rtl" style={{display: 'flex', justifyContent: 'space-between', height: '100%'}}>
            <div style={{height: '100%'}}>
            <Form onValuesChange={(value, allValues) => {
                const {numbers, first, second, third} = allValues.plateNumber || {}
                const fullPlateInput = [numbers, third, second, first].filter(item => !!item).join('')
                setPlateString(fullPlateInput)
            }}>
                <FormItem noStyle>
                    <Space>
                    <FormItem 
                            name={['plateNumber', 'third']}
                            rules={[{required: true, message: ' '}]}
                            normalize={(value, preValue) => {
                                if (arabicPlateLetterRegExp.test(value)) return value
                                return preValue || ''
                            }}
                        >
                            <Input style={{ width: 40 }} maxLength={1} />
                        </FormItem>
                        <FormItem 
                            name={['plateNumber', 'second']}
                            rules={[{required: true, message: ' '}]}
                            normalize={(value, preValue) => {
                                console.log(value, preValue, arabicPlateLetterRegExp.test(value))
                                if (arabicPlateLetterRegExp.test(value))  return value
                                return preValue || ''
                            }}
                        >
                            <Input style={{ width: 40 }} maxLength={1} />
                        </FormItem>
                        <FormItem 
                            name={['plateNumber', 'first']}
                            rules={[{required: true, message: ' '}]}
                            normalize={(value, preValue) => {
                                if (arabicPlateLetterRegExp.test(value))  return value
                                return preValue || ''
                            }}
                        >
                            <Input 
                                style={{ width: 40, padding: 4 }} maxLength={1} 
                            />
                        </FormItem>
                        <FormItem 
                            name={['plateNumber', 'numbers']}
                            rules={[{required: true, message: ' '}]}
                            normalize={(value, preValue) => {
                                if (arabicNumberRegExp.test(value))  return value
                                return preValue || ''
                            }}
                        >
                            <Input 
                                style={{ width: 100 }} 
                                maxLength={4}
                            />
                        </FormItem>
                      
                    </Space>
                </FormItem>
            </Form>
            <div>
                {plateString}
            </div>
            </div>
            <div style={{display: 'flex', width: 500, height: '100%'}}>
                <NumberMappingTable />
                <LetterMappingTable />
            </div>
          
        </div>
    );
};

export default PlateFormInput;
