import React, {useState, useEffect} from "react";

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {
  Row,
  Col,
  Button,
  Card,
  Avatar,
  List,
  Input,
  Select
} from "antd";

import {getUserInfor} from "src/api/account";
import {updateInfor} from "src/api/user";

// --------------------------------------------------------------------------

const {Option} = Select;

export default function UserView() {
  const [isEditing,
    setIsEditing] = useState(false);
  const [name,
    setName] = useState('');
  const [email,
    setEmail] = useState('');
  const [phone,
    setPhone] = useState('');
  const [address,
    setAddress] = useState('');
  const [gender,
    setGender] = useState('');
  const [change, setChange] = useState(false);

  useEffect(() => {
    const fetchdata = async() => {
      const response = await getUserInfor();
      setName(response.data.name);
      setEmail(response.data.email);
      setPhone(response.data.phonenumber);
      setAddress(response.data.address);
      if (response.data.gender === 1) {
        setGender('Nữ');
      } else if (response.data.gender === 0) {
        setGender('Nam');
      } else if (response.data.gender === 2) {
        setGender('Khác');
      }
    };
    fetchdata();
  }, [change]);

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px'
  };

  const labelStyle = {
    width: '150px',
    fontWeight: 'bold'
  };

  const inputStyle = {
    flex: '1'
  };

  const handleSaveInfor = async() => {
    if (isEditing) {
      const formData = {
        "name": name,
        "email": email,
        "phonenumber": phone,
        "address": address,
        "gender": parseInt(gender)
      }
      const result = await updateInfor(formData);
      setChange(!change);
      if (result.data.status === true) {
        alert("Update successfully");
      } else {
        alert("Update failed");
      }
    }
    setIsEditing(!isEditing);
  }

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}>
        <Typography variant="h4">Xin chào {name} ✌️✌️✌️!!!</Typography>
      </Stack>

      <Stack>
        <Card title="Trang cá nhân" style={{
          fontWeight: 'bold'
        }}>
          <Row>
            <Col span={6}>
              <Avatar size={128} src="assets/images/avatars/avatar_1.jpg"/>
            </Col>
            <Col span={18}>
              <Button
                onClick={() => handleSaveInfor()}
                style={{
                marginBottom: '20px'
              }}>
                {isEditing
                  ? 'Lưu'
                  : 'Chỉnh sửa'}
              </Button>
              <List>
                <List.Item style={itemStyle}>
                  <span style={labelStyle}>Họ và tên</span>
                  {isEditing
                    ? (<Input
                      style={inputStyle}
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}/>)
                    : (
                      <span>{name}</span>
                    )}
                </List.Item>
                <List.Item style={itemStyle}>
                  <span style={labelStyle}>Email</span>
                  {isEditing
                    ? (<Input
                      style={inputStyle}
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}/>)
                    : (
                      <span>{email}</span>
                    )}
                </List.Item>
                <List.Item style={itemStyle}>
                  <span style={labelStyle}>Số điện thoại</span>
                  {isEditing
                    ? (<Input
                      style={inputStyle}
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}/>)
                    : (
                      <span>{phone}</span>
                    )}
                </List.Item>
                <List.Item style={itemStyle}>
                  <span style={labelStyle}>Địa chỉ</span>
                  {isEditing
                    ? (<Input
                      style={inputStyle}
                      type="text"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}/>)
                    : (
                      <span>{address}</span>
                    )}
                </List.Item>
                <List.Item style={itemStyle}>
                  <span style={labelStyle}>Giới tính</span>
                  {isEditing
                    ? (
                      <Select
                        style={inputStyle}
                        value={gender}
                        onChange={(value) => setGender(value)}>
                        <Option value="0">Nam</Option>
                        <Option value="1">Nữ</Option>
                        <Option value="2">Khác</Option>
                      </Select>
                    )
                    : (
                      <span>
                        {/* {gender === 0 ? "Male" : gender === 1 ? "Female" : "Other"} */}
                        {gender}
                      </span>
                    )}
                </List.Item>
              </List>
            </Col>
          </Row>
        </Card>
      </Stack>
    </Container>
  );
}