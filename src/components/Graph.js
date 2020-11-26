import React from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  } from 'recharts';
class Graph extends React.Component{
    constructor(props){
        super(props)
        this.state={
            values:[]
        }
    }
    componentDidMount(){
        var datarows=[];
        fetch("https://23w2ldb5tf.execute-api.ap-south-1.amazonaws.com/Dev/updatedinterestrates",{
            "Content-Type":"application/json",
            "Accept":"*/"
        })
        .then((res)=>{
            return res.json();
        })
        .then((result)=>{
            datarows=result.datarows;
            let convertedValues=[];
            datarows.forEach((item)=>{
                let temp={};
                temp.month=item[0];
                temp.rate=item[1];
                convertedValues[item[2]]=temp;
            })
            console.log(convertedValues);
            this.setState({values:[...convertedValues]});
        })
    }
    render (){
        console.log(this.state.values);
            return (
                <LineChart
                  width={1600}
                  height={600}
                  data={this.state.values}
                  margin={{
                    top: 15, right: 10, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  
                  <Line type="monotone" dataKey="rate" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              );
    }
}

export default Graph;