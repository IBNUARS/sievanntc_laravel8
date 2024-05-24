import React from 'react';
import Helmet from 'react-helmet';
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import Layout from './../../Shared/Layout';

const InfoDashboard = (props) => {
  return (
    <div className="col-sm-6 col-md-3">
        <div style={{paddingBottom: 30}} className={"overview-item overview-item--"+props.style}>
            <div className="overview__inner">
                <div className="overview-box clearfix">
                    <div className="icon">
                        <i className={"fas "+props.icon}></i>
                    </div>
                    <div className="text">
                        <h2>{props.number}</h2>
                        <span>{props.title}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
const Dashboard = (props) => {
  
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <div className="row m-t-25">
        <InfoDashboard 
          style='c1' 
          icon='fa-book'
          number={props.ujian}
          title="Data Ujian"
        />

        <InfoDashboard 
          style='c2' 
          icon='fa-question-circle'
          number={props.soal}
          title="Data Soal"
        />

        <InfoDashboard 
          style='c3' 
          icon='fa-clock'
          number={props.sesi}
          title="Data Sesi"
        />

        <InfoDashboard 
          style='c4' 
          icon='fa-user-circle'
          number={props.peserta}
          title="Data Peserta"
        />
      </div> 

      <div className="row">
        <div className="col-lg-12">
          <div className="au-card recent-report">
              <div className="au-card-inner">
                <h3 className="title-2">Nilai Hasil Ujian</h3> <br/>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={props.data}
                    margin={{
                      top: 5, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nilai" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="jumlah" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
          </div>
        </div>
      </div>                                              
    </div>
  );
}

Dashboard.layout = page => <Layout children={page} />

export default Dashboard;
