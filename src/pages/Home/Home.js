import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Radar} from 'recharts';
import Layout from '../../components/Layout'
import Radar_Chart from './Radar_Chart';
import Bar_Chart from './Bar_Chart';
import './Home.css';
import './Dark-mode.css'
import '../style/Responsive.css'
import { getAllUser, getAllCategory, getAllProducts } from '../../data/API'
import { useNavigate } from 'react-router-dom';
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
  },[])
  useEffect(() => {
    if (userLogin) {
      navigate('/home')
    } else {
      navigate('/')
    }
  }, [navigate]);
  return (
    
    <Layout>
      <div className="topbar">
        <div className="toggle">
          <i className="fa-solid fa-bars"></i>
        </div>
        <div className="search">
          <h3 data-en="OVERVIEW" data-vi="TỔNG QUAN">OVERVIEW</h3>
        </div>
        <div className="used">
          <div className="selec-bar">
            <select className="select-bar" id="language-select">
              <option value="en">En</option>
              <option value="vi">Vi</option>
            </select>
          </div>
          <div className="used-left">
            <label className="theme">
              <input type="checkbox" className="input-cb" id="checkbox" />
              <svg className="ic icon-sun" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="5"></circle><line x1="12" x2="12" y1="1" y2="3"></line><line x1="12" x2="12" y1="21" y2="23"></line><line x1="4.22" x2="5.64" y1="4.22" y2="5.64"></line><line x1="18.36" x2="19.78" y1="18.36" y2="19.78"></line><line x1="1" x2="3" y1="12" y2="12"></line><line x1="21" x2="23" y1="12" y2="12"></line><line x1="4.22" x2="5.64" y1="19.78" y2="18.36"></line><line x1="18.36" x2="19.78" y1="5.64" y2="4.22"></line></svg>
              <svg className="ic icon-moon" viewBox="0 0 24 24"><path d="m12.3 4.9c.4-.2.6-.7.5-1.1s-.6-.8-1.1-.8c-4.9.1-8.7 4.1-8.7 9 0 5 4 9 9 9 3.8 0 7.1-2.4 8.4-5.9.2-.4 0-.9-.4-1.2s-.9-.2-1.2.1c-1 .9-2.3 1.4-3.7 1.4-3.1 0-5.7-2.5-5.7-5.7 0-1.9 1.1-3.8 2.9-4.8zm2.8 12.5c.5 0 1 0 1.4-.1-1.2 1.1-2.8 1.7-4.5 1.7-3.9 0-7-3.1-7-7 0-2.5 1.4-4.8 3.5-6-.7 1.1-1 2.4-1 3.8-.1 4.2 3.4 7.6 7.6 7.6z"></path></svg>
            </label>
          </div>
          <div className="used-right">
            <label htmlFor="" data-en="Hi" data-vi="Chào">Hi: </label>
            <span className="welcome" id="welcome">{userLogin?.name}</span>
          </div>
        </div>
      </div>
      <div className="real">
        <div className="real-top">
          <div className="real-item-1">
            <h3 className="estate" data-en="REAL ESTATE" data-vi="ĐỊA ỐC">REAL ESTATE</h3>
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
                <div className="progress orange"></div>
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
                <div className="progress light"></div>
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
                <div className="progress siena"></div>
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
                  <span className="number-1">50</span>
                  <i className="fa-solid fa-arrow-up"></i>
                  <span className="number-up">56.19%</span>
                </div>
              </div>
              <div className="row-right">
                <div className="progress deep"></div>
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
                piechart.map((item, index) => (
                  <p key={index}>{item.name}</p>
                ))
              }
            </div>
            <div className="flex-noted">
            {
                COLORS.map((item, index) => (
                  <div key={index}className='noted-colors' style={{backgroundColor: item}}></div>
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
