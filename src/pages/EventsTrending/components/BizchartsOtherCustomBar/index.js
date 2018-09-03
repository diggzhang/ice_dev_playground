import React from 'react';
import axios from 'axios';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
  PathUtil,
} from 'bizcharts';

class Custombar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios('http://localhost:3000/events').then((response) => {
      this.setState({
        data: response.data,
      });
    });
  }

  render() {
    const data = this.state.data;

    Shape.registerShape('interval', 'smoothInterval', {
      getShapePoints(cfg) {
        const width = cfg.size;
        const x = cfg.x; // 最小值的点出现高度为0的情况

        const end = cfg.y === 0 ? 0.1 : cfg.y; // 实现层叠效果，并且多加四个控制点(1,2,4,5)来调整贝塞尔曲线的弧度

        return [
          {
            x: x - width,
            y: cfg.y0,
          },
          {
            x: x - 0.025,
            y: end / 3,
          },
          {
            x: x - 0.005,
            y: (end * 6) / 7,
          },
          {
            x: x + 0.02,
            y: end,
          },
          {
            x: x + 0.045,
            y: (end * 6) / 7,
          },
          {
            x: x + 0.065,
            y: end / 3,
          },
          {
            x: x + width + 0.04,
            y: cfg.y0,
          },
        ];
      },

      drawShape(cfg, container) {
        // 将归一化后的数据转换为画布上的坐标
        const points = cfg.points;
        let data = [],
          prePoint = null;
        const first = points[0];
        const constaint = [
          // 范围
          [0, 0],
          [1, 1],
        ];
        Util.each(points, (point) => {
          if (
            !prePoint ||
            !(prePoint.x === point.x && prePoint.y === point.y)
          ) {
            data.push(point.x);
            data.push(point.y);
            prePoint = point;
          }
        });
        const spline = PathUtil.catmullRomToBezier(data, false, constaint);
        let path =
          `M${first.x} ${first.y}${PathUtil.parsePathArray(spline)}`;
        path = PathUtil.pathToAbsolute(path);
        path = this.parsePath(path, false);
        return container.addShape('path', {
          attrs: {
            fill: cfg.color || '#00D9DF',
            path,
          },
        });
      },
    });
    const COLORS = [
      '#0088FE',
      '#00C49F',
      '#FFBB28',
      '#FF8441',
      '#EE3B61',
      '#FF6590',
      '#9575DE',
      '#8EA4F1',
      '#C6E8D2',
      '#FFDB91',
      '#FF9054',
    ];
    return (
      <div>
        <div>
          <Chart
            height={300}
            source={data}
            forceFit
            padding={[50, 100, 50, 60]}
            data={data}
          >
            <Axis
              name="eventKey"
              tickLine={null}
              line={null}
              title={null}
              labels={{
                custom: true,
                renderer: (text, item, index) => {
                  return (
                    `<div style="color:${
                    COLORS[index]
                    };font-size:10px;width:45px;position:relative;left:15px;">${
                    text
                    }</div>`
                  );
                },
              }}
            />
            <Axis name="points" visible={false} />
            <Geom
              type="interval"
              position="eventKey*points"
              shape="smoothInterval"
              color={['eventKey', COLORS]}
              label={[
                'points',
                {
                  custom: true,
                  renderer: val => {
                    // 3 替换成Min
                    const topOffset = val == 3 ? -30 : 0;
                    return (
                      `<div style="color:#999;font-size:10px;position:relative;left:15px;top:${
                      topOffset
                      }px">${
                      val
                      }%</div>`
                    );
                  },
                },
              ]}
            >
              <Label label="points" />
            </Geom>
          </Chart>
        </div>
      </div>
    );
  }
}

export default Custombar;
