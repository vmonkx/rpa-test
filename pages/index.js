import Head from "next/head";

import { useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";

import axios from "axios";

export default function Home() {
  const [baseInfo, setBaseInfo] = useState({
    id: Math.round(Math.random()) + Date.now(),
    orphan: 0,
    gender: "male",
    birth_year: 0,
    birth_month: 0,
    birth_day: 0,
    secret: 0,
  });
  const [obrGroup, setObrGroup] = useState();
  const [groupInfo, setGroupInfo] = useState({
    id: 0,
    course_num: 0,
    title: 0,
    education_level: 0,
  });

  const [errorText, setErrorText] = useState();
  const [successText, setSuccessText] = useState();

  const handleObrGroup = (e) => {
    setObrGroup(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqObj = baseInfo;
    reqObj[obrGroup] = groupInfo;

    console.log("SUBMIT", JSON.stringify(reqObj));
    
    getLink(reqObj);
  };

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const getLink = async (req) => {
    const res = await axios
      .post("/api/test", JSON.stringify(req), axiosConfig)
      .then((res) => {
        console.log("RESPONSE", res);
        setSuccessText(res.data?.url);
      })

      .catch((e) => {
        console.log("EE", e.response);
        setErrorText(e.response?.data?.msg);
      });
    
  };

  const handleChangeBaseInfo = (e) => {
    setBaseInfo((base) => {
      if (e.target.type == "checkbox") {
        base[e.target.id] = Number(e.target.checked);
      } else {
        base[e.target.id] = e.target.value;
      }

      return base;
    });
  };

  const handleChangeGroupInfo = (e) => {
    setGroupInfo((group) => {
      if (e.target.type == "checkbox") {
        group[e.target.id] = Number(e.target.checked);
      } else {
        group[e.target.id] = e.target.value;
      }

      return group;
    });
  };

  return (
    <div>
      <Head>
        <title>Отправка данных для тестирования RPA</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <Row className="mb-3">
            <Col>
              <h1>Заполните данные для получения ссылки для тестирования</h1>
            </Col>
            {errorText && (
              <Alert variant="danger">{`Произошла ошибка: ${errorText}`}</Alert>
            )}
          </Row>
          <Row className="mb-3">
            <Col>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label as="h3">Введите информацию о студенте</Form.Label>
                  <Form.Label>ID студента</Form.Label>
                  <Form.Control
                    type="text"
                    className="mb-3"
                    id="id"
                    placeholder="Введите ID студента"
                    onChange={handleChangeBaseInfo}
                    disabled
                  />
                  <Form.Check
                    type="checkbox"
                    id="orphan"
                    label="Является ли сиротой?"
                    onChange={handleChangeBaseInfo}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Выберите пол студента</Form.Label>
                  <Form.Select id="gender" onChange={handleChangeBaseInfo}>
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Row>
                    <Col md="auto">
                      <Form.Label>Год рождения</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Введите год рождения"
                        id="birth_year"
                        onChange={handleChangeBaseInfo}
                      />
                    </Col>
                    <Col md="auto">
                      <Form.Label>Месяц рождения</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Введите месяц рождения"
                        id="birth_month"
                        onChange={handleChangeBaseInfo}
                      />
                    </Col>
                    <Col md="auto">
                      <Form.Label>День рождения</Form.Label>
                      <Form.Control
                        type="number"
                        id="birth_day"
                        placeholder="Введите день рождения"
                        onChange={handleChangeBaseInfo}
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Секретный ключ организации</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Введите ключ"
                    id="secret"
                    onChange={handleChangeBaseInfo}
                  />
                  <Form.Text>
                    Секретный ключ организации, полученный в admin.testedu.ru
                    (Настройки организации).
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label as="h3">Введите информацию о группе</Form.Label>
                  <Form.Select id="obr_group" onChange={handleObrGroup}>
                    <option value="0">Выберите базу обучения</option>
                    <option value="vpo_group">ВПО</option>
                    <option value="spo_group">СПО</option>
                  </Form.Select>
                  <Row className="align-items-center mt-3 mb-3">
                    <Col xs="auto">
                      <Form.Label htmlFor="id" visuallyHidden>
                        Id группы
                      </Form.Label>
                      <Form.Control
                        id="id"
                        placeholder="Введите ID группы"
                        onChange={handleChangeGroupInfo}
                      />
                    </Col>
                    <Col xs="auto">
                      <Form.Label htmlFor="course_num" visuallyHidden>
                        Номер курса
                      </Form.Label>
                      <Form.Control
                        id="course_num"
                        type="number"
                        placeholder="Номер курса"
                        onChange={handleChangeGroupInfo}
                      />
                    </Col>

                    <Col xs="auto">
                      <Form.Label htmlFor="education_level" visuallyHidden>
                        Уровень образования
                      </Form.Label>
                      <Form.Select
                        id="education_level"
                        placeholder="Уровень образования"
                        onChange={handleChangeGroupInfo}
                      >
                        <option value="0">Выберите уровень образования</option>
                        <option value="1">бакалавриат</option>
                        <option value="2">специалитет</option>
                        <option value="3">магистратура</option>
                        <option value="9">
                          учащиеся пришли после 9 класса
                        </option>
                        <option value="11">
                          учащиеся пришли после 11 класса
                        </option>
                      </Form.Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Label htmlFor="title" visuallyHidden>
                        Название группы
                      </Form.Label>
                      <Form.Control
                        className="mb-2"
                        id="title"
                        placeholder="Название группы"
                        onChange={handleChangeGroupInfo}
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={successText}>
                  Получить ссылку
                </Button>
              </Form>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              {successText && (
                <Alert variant="success">
                  Ваша ссылка для прохождения тестирования &nbsp;
                  <a href={successText}>{successText}</a>
                </Alert>
              )}
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
