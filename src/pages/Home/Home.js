import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Layout from '../../components/Layout'
import Radar_Chart from './Radar_Chart';
import Bar_Chart from './Bar_Chart';
import './Home.css';
import '../style/Responsive.css'
import { getAllUser, getAllCategory, getAllProducts } from '../../data/API'
import { useNavigate } from 'react-router-dom';
import buy from '../../images/ic_glass_buy.png'
import bag from '../../images/ic_glass_bag.png'
import users from '../../images/ic_glass_users.png'
import order from '../../images/ic_glass_message.png'
const piechart = [
  { name: 'Packed', value: 400 },
  { name: 'Dispatched', value: 300 },
  { name: 'Delivered', value: 300 },
  { name: 'Earlier', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Home() {
  const userLogin = JSON.parse(localStorage.getItem('user')) || null;
  const navigate = useNavigate();
  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])
  const [user, setUser] = useState([])
  const [changeProduct, setChangeProduct] = useState()
  const [changeUser, setChangeUser] = useState()
  const [changeCate, setChangeCate] = useState()
  useEffect(() => {
    const initialQuantity = 50;
    const newQuantity = product.length;
    const change = ((newQuantity - initialQuantity) / initialQuantity) * 100;
    setChangeProduct(change.toFixed(2));

    const initialUser = 50;
    const userQuantity = user.length;
    const changeUser = ((userQuantity - initialUser) / initialUser) * 100;
    setChangeUser(changeUser.toFixed(2))

    const initialCategory = 20;
    const categoryQuantity = category.length;
    const changeCategory = ((categoryQuantity - initialCategory) / initialCategory) * 100;
    setChangeCate(changeCategory.toFixed(2))

  })
  useEffect(() => {
    getAllProducts()
      .then((data) => {
        setProduct(data);
      })
    getAllCategory()
      .then((category) => {
        setCategory(category);
      })
    getAllUser()
      .then((user) => {
        setUser(user);
      })
  }, [])
  useEffect(() => {
    if (userLogin) {
      navigate('/home')
    } else {
      navigate('/')
    }
  }, [navigate]);
  return (

    <Layout>
      <div className="real">
        <div className="real-top">
          <div className="real-item-1">
            <h3 className="estate" data-en="REAL ESTATE" data-vi="ĐỊA ỐC">DASHBOARD</h3>
            <span className="path">
              <a href="#" className="dashboard" data-en="Dashboards" data-vi="Trang tổng quan">Dashboards</a>
              <i className="fa-solid fa-angle-right"></i>
              <a href="#" className="real-estate" data-en="Real-Estate" data-vi="Địa Ốc">Real-Estate</a>
            </span>
          </div>
          <div className="real-item-2">
            <div className="real-item-row">
              <div className="row-left">
                <div className="row-title">
                  <span className="title-1" data-en="PropertiehtmlFor sale" data-vi="Tài sản để bán">
                    The number of products
                  </span>
                </div>
                <div className="row-number">
                  <span className="number-1">{product.length} </span>
                  {changeProduct >= 0 ?
                    <>
                      <i className="fa-solid fa-arrow-up"></i>
                      <span className="number-up">{changeProduct}%</span>
                    </> :
                    <>
                      <i className="fa-solid fa-arrow-down"></i>
                      <span className="number-down">{changeProduct}%</span>
                    </>
                  }
                </div>
              </div>
              <div className="row-right">
                <div className="row-right-img">
                  <img src={bag} alt="" className='img-dashboard' />
                </div>
              </div>
            </div>
            <div className="real-item-row">
              <div className="row-left">
                <div className="row-title">
                  <span className="title-1" data-en="Propertie for rent" data-vi="Bất động sản cho thuê">
                    Number of users
                  </span>
                </div>
                <div className="row-number">
                  <span className="number-1">{user.length} </span>
                  {changeUser >= 0 ?
                    <>
                      <i className="fa-solid fa-arrow-up"></i>
                      <span className="number-up">{changeUser}%</span>
                    </> :
                    <>
                      <i className="fa-solid fa-arrow-down"></i>
                      <span className="number-down">{changeUser}%</span>
                    </>
                  }
                </div>
              </div>
              <div className="row-right">
                <div className="row-right-img">
                  <img src={users} alt="" className='img-dashboard' />
                </div>
              </div>
            </div>
            <div className="real-item-row">
              <div className="row-left">
                <div className="row-title">
                  <span className="title-1" data-en=" Visitors" data-vi="Khách">
                    Number of categories
                  </span>
                </div>
                <div className="row-number">
                  <span className="number-1">{category.length}</span>
                  {changeCate >= 0 ?
                    <>
                      <i className="fa-solid fa-arrow-up"></i>
                      <span className="number-up">{changeCate}%</span>
                    </> :
                    <>
                      <i className="fa-solid fa-arrow-down"></i>
                      <span className="number-down">{changeCate}%</span>
                    </>
                  }
                </div>
              </div>
              <div className="row-right">
                <div className="row-right-img">
                  <img src={order} alt="" className='img-dashboard' />
                </div>
              </div>
            </div>
            <div className="real-item-row">
              <div className="row-left">
                <div className="row-title">
                  <span className="title-1" data-en="Propertie for sale" data-vi="Tài sản để bán">
                    Number of orders
                  </span>
                </div>
                <div className="row-number">
                  <span className="number-1">4</span>
                  <i className="fa-solid fa-arrow-down"></i>
                  <span className="number-down">26.19%</span>
                </div>
              </div>
              <div className="row-right">
                <div className="row-right-img">
                  <img src={buy} alt="" className='img-dashboard' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="real-mid">
          <div className="real-mid-flex four">
            <div className="flex-top">
              <h4 className="flex-top-title" data-en="Properties Type" data-vi="Loại thuộc tính">Properties Type</h4>
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
            <div className="flex-bottom">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={piechart}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {piechart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-noted">
              {
                Array.from({ length: Math.max(piechart.length, COLORS.length) }).map((_, index) => (
                  <React.Fragment key={index}>
                    {index < COLORS.length && <div className="noted-colors" style={{ backgroundColor: COLORS[index] }}></div>}
                    {index < piechart.length && <p>{piechart[index].name}</p>}
                  </React.Fragment>
                ))
              }
            </div>
          </div>
          <div className="real-mid-flex six">
            <div className="six-top">
              <h4 className="six-top-title" data-en="Revenue Overview" data-vi="Tổng quan về doanh thu">Revenue Overview</h4>
              <input type="date" name="" id="" className="date" />
            </div>
            <div className="six-bottom">
              <Bar_Chart />
            </div>
          </div>
        </div>
        <div className="real-bottom">
          <div className="real-bottom-flex">
            <div className="flex-top">
              <h4 className="flex-top-title" data-en="Skill Status" data-vi="Trạng thái kỹ năng">Skill Status</h4>
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
            <div className="flex-bottom">
              <Radar_Chart />
            </div>
          </div>
          <div className="real-bottom-flex">
            <div className="five-top">
              <h4 className="six-top-title" data-en="Order Status" data-vi="Tình trạng đặt hàng">Order Status</h4>
              <select className="select-today">
                <option value="1">Today</option>
                <option value="2">Tomorrow</option>
                <option value="3">Yesterday</option>
              </select>
            </div>
            <div className="five-bottom">
              <div className="status">
                <div className="status-title">
                  <span className="title-h3" data-en="Packed" data-vi="Đóng gói">Packed</span>
                  <span className="percent">89%</span>
                </div>
                <div className="status-horizontal">
                  <div className="horizontal-item blue"></div>
                </div>
              </div>
              <div className="status">
                <div className="status-title">
                  <span className="title-h3" data-en="Dispatched" data-vi="Đã gửi đi">Dispatched</span>
                  <span className="percent">56%</span>
                </div>
                <div className="status-horizontal">
                  <div className="horizontal-item pink"></div>
                </div>
              </div>
              <div className="status">
                <div className="status-title">
                  <span className="title-h3" data-en="Reach Station" data-vi="Trạm tiếp cận">Reach Station</span>
                  <span className="percent">94%</span>
                </div>
                <div className="status-horizontal">
                  <div className="horizontal-item violet"></div>
                </div>
              </div>
              <div className="status">
                <div className="status-title">
                  <span className="title-h3" data-en="Out for delivery" data-vi="Ra ngoài để giao hàng">Out for delivery</span>
                  <span className="percent">53%</span>
                </div>
                <div className="status-horizontal">
                  <div className="horizontal-item yellow"></div>
                </div>
              </div>
              <div className="status">
                <div className="status-title">
                  <span className="title-h3" data-en="Delivered" data-vi="Đã giao hàng">Delivered</span>
                  <span className="percent">77%</span>
                </div>
                <div className="status-horizontal">
                  <div className="horizontal-item green"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
