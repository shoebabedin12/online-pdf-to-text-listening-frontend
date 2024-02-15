import { MailOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
// import { Document, PDFViewer, Page } from "@react-pdf/renderer";

import {
  Button,
  Col,
  Form,
  Image,
  List,
  Row,
  Typography,
  Upload,
  message
} from "antd";
import axios from "axios";
import VirtualList from "rc-virtual-list";
import { useEffect, useState } from "react";
import ColorfulText from "../components/ColorfulText/ColorfulText";
import TextToSpeech from "../components/TextToSpeech/TextToSpeech";

const Profile = () => {
  const api = process.env.REACT_APP_API_KEY;
  const live = api.split("/")[2];
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [user, setUser] = useState("");
  const [top, setTop] = useState(100);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [loadings, setLoadings] = useState([]);
  // const { speak } = useSpeechSynthesis();
  const [speech, setSpeech] = useState("");
  // const { Text, speechStatus, start, pause, stop } = useSpeech(speech);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  const ContainerHeight = "600";
  const appendData = () => {
    if (user && user.post && user.post.length > 0) {
      const postsData = user?.post?.map((post) => ({
        name: `${live}/${post?.file.replace(/\\/g, "/")}`,
        picture: `${live}/${post?.file.replace(/\\/g, "/")}`
      }));

      setData(postsData); // Set data directly instead of concatenating
    }
  };

  useEffect(() => {
    appendData();
  }, [user]); // Watch for changes in the user state

  useEffect(() => {
    // Fetch additional data if needed
    appendData(); // Initial data load when the component mounts
  }, [form]); // Watch for changes in the form state if needed

  const onScroll = (e) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (
      Math.abs(
        e.currentTarget.scrollHeight -
          e.currentTarget.scrollTop -
          ContainerHeight
      ) <= 1
    ) {
      appendData();
    }
  };

  const handleUpload = () => {
    setLoading(true);
    setLoading(false);
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userdata");

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUser(userData);
    }
  }, []);

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("userId", user?.key); // Include user ID in the form data
    values.files?.forEach((file) => {
      formData.append("files", file.originFileObj);
    });
    try {
      const response = await axios.post(`${api}/user/upload`, formData);
      if (response.status === 200) {
        message.success(response.data.message);
        form.resetFields();
      }
    } catch (error) {
      message.error(error.response.data.message || "Failed to upload files.");
      console.log(error);
    }
  };

  // const PDFViewerComponent = ({ pdfUrl }) => (
  //   <PDFViewer style={{ width: "100%", height: "600px" }}>
  //     <Document file={pdfUrl}>
  //       <Page pageNumber={1} />
  //     </Document>
  //   </PDFViewer>
  // );

  // const speakPdfText = async (pdfUrl) => {
  //   console.log("Attempting to speak PDF");
  //   console.log(pdfUrl);

  //   setSpeech(pdfUrl);

  //   try {
  //     // const response = await axios.get(pdfUrl, {
  //     //   responseType: "arraybuffer"
  //     // });
  //     console.log("pdfUrl", pdfUrl);
  //     const arrayBuffer = pdfUrl;
  //     console.log(arrayBuffer);
  //     const byteArray = new Uint8Array(arrayBuffer);
  //     const text = await getDocument(byteArray).promise.then((doc) => {
  //       let text = "";
  //       const promises = [];
  //       for (let i = 1; i <= doc.numPages; i++) {
  //         promises.push(doc.getPage(i).then((page) => page.getTextContent()));
  //       }
  //       return Promise.all(promises).then((contents) => {
  //         contents.forEach((content) => {
  //           content.items.forEach((item) => {
  //             text += item.str + " ";
  //           });
  //         });
  //         return text;
  //       });
  //     });
  //     speak({ text });
  //   } catch (error) {
  //     console.error("Error fetching PDF and converting to text:", error);
  //   }
  // };

  return (
    <>
      {contextHolder}
      <Row justify="space-between" gap={12}>
        <Col className="gutter-row" lg={4}>
          <div
            style={{
              backgroundColor: "#fff",
              position: "fixed",
              top: 100,
              padding: "10px 20px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "10px",
              width: "calc(100% - 81%)"
            }}
          >
            {user?.email && (
              <ColorfulText
                name={user?.email.substring(0, 1)}
                className={"profile-image"}
              />
            )}
            <Title level={5} style={{ padding: "0", margin: "0" }}>
              <UserOutlined />
              {user?.email && user?.email.split("@")[0]}
            </Title>
            <Title level={5} style={{ padding: "0", margin: "0" }}>
              <MailOutlined /> {user?.email && user?.email}
            </Title>
          </div>
        </Col>
        <Col
          className="gutter-row"
          lg={19}
          style={{
            backgroundColor: "#fff",
            padding: "10px 20px",
            borderRadius: "10px",
            gap: "10px",
            minHeight: "100vh"
          }}
        >
          <Form
            onFinish={onFinish}
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true
            }}
          >
            <Form.Item
              name="files"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                multiple
                name="logo"
                listType="picture"
                accept=".pdf, .png"
                onChange={(info) => {
                  if (info.file.status !== "uploading") {
                    console.log(info.file, info.fileList);
                  }
                  if (info.file.status === "done") {
                    message.success(
                      `${info.file.name} file uploaded successfully`
                    );
                  } else if (info.file.status === "error") {
                    message.error(`${info.file.name} file upload failed.`);
                  }
                }}
                progress={{
                  strokeColor: {
                    "0%": "#108ee9",
                    "100%": "#87d068"
                  },
                  strokeWidth: 3,
                  format: (percent) =>
                    percent && `${parseFloat(percent.toFixed(2))}%`
                }}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <div
            style={{
              border: "1px solid black",
              padding: "0px 20px"
            }}
          >
            <List>
              <VirtualList
                data={data}
                height={ContainerHeight}
                itemHeight={47}
                itemKey="email"
                onScroll={onScroll}
              >
                {(item) => (
                  <List.Item key={item.email}>
                    <List.Item.Meta
                      avatar={
                        item.picture &&
                        (item.name.endsWith(".pdf") ? (
                          <>
                            <iframe
                              src={`${item.picture}`}
                              frameborder="0"
                              height="500px"
                              width="100%"
                            ></iframe>
                          </>
                        ) : (
                          <Image
                            width={150}
                            height={150}
                            src={item.picture}
                            onLoad={(e) => {
                              e.preventDefault(); // Prevent automatic download
                            }}
                          />
                        ))
                      }
                    />

                    {item.name && item.name.endsWith(".pdf") && (
                      <>
                        <TextToSpeech text={"আমরা বাংলায় ওয়েব ডেডলপমেন্ট নিয়ে কাজ করতে গিয়ে প্রথম যে সমস্যাটার মুখোমুখি হই, সেটা হলো, বাংলা ডেমো টেক্সট। ইংরেজির জন্য  তো আছে । বাংলার জন্য কি আছে? সেই ধারনা থেকেই বাংলা ডেমো টেক্সট তৈরীর চেষ্টা। এর প্রয়োজনীয় প্রায় সব ফরম্যাটেই বাংলা ডেমো টেক্সট তুলে ধরা হয়েছে। আশা করছি, এরি ক্ষুদ্র প্রচেষ্টা আপনাদের কাজে আসবে।"}/>
                        
                      </>
                    )}
                  </List.Item>
                )}
              </VirtualList>
            </List>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
