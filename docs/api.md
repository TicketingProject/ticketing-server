# ticketing-server API

* 当前请求 domain 为：`https://movie.kaocat.com`

* 请求附加`format`参数可获取格式化后 json 数据，如：`https://movie.kaocat.com/api/movie?format`

<!-- MarkdownTOC -->

- [返回数据格式](#返回数据格式)
    - [错误码说明](#错误码说明)

---

### API

- [电影类](#电影类)
    - [获取上映及待映电影列表](#获取上映及待映电影列表)
    - [获取电影详情信息](#获取电影详情信息)
    - [获取电影预告片URL](#获取电影预告片URL)
- [区域类](#区域类)
    - [获取全部区域列表](#获取全部区域列表)
    - [获取当前所在区域](#获取当前所在区域)
- [影院类](#影院类)
    - [获取全部影院列表](#获取影院信息)
    - [获取所在区域影院列表](#获取影院信息)
    - [获取按距离获取所在区域影院列表](#获取按距离获取所在区域影院列表)
    - [获取影院实时上映详情](#获取影院实时上映详情)
- [电影排期类](#电影排期类)
    - [获取电影排期](#获取电影排期)
- [座位类](#座位类)
    - [获取场次座位实时信息](#获取场次座位实时信息)
- [用户类](#用户类)
    - [换取token](#换取token)
- [订单类](#票务类)
    - [下单](#下单)
    - [获取订单列表](#获取订单列表)

<!-- /MarkdownTOC -->

<a name="返回数据格式"></a>
## 返回数据格式

请求返回数据为 JSON 对象，里面包含 `code`, `message` 和 `data` 三字段，分别表示错误码，错误描述信息以及相关数据，其中 `code` 为 0 表示一个成功的请求。

比如，一个成功请求的返回数据：

```javascript
{
    "code": 0,
    "message": "OK",
    "data": {
        ...
    }
}
```

一个失败请求的返回数据：

```javascript
{
    "code": 1001,
    "message": "DataBase Select Error",
    "data": {}
}
```



<a name="错误码说明"></a>
### 错误码说明

| Code | Description |
|:----:|:-----------:|
|0|成功|
|-1|未知错误|
|1001|读取数据库数据错误|
|1002|爬取实时数据错误|
|1003|读取缓存错误|
|2000|未知用户OpenID|
|2001|下单失败|


- [电影类](#电影类)
    - [获取电影详情信息](#获取电影详情信息)
    - [获取电影预告片URL](#获取电影预告片URL)
<a name="电影类"></a>
## 电影类

<a name="获取上映及待映电影列表"></a>
### 获取上映及待映电影列表

Request URI:

```
GET /api/movie
```

返回数据为一组*电影简介数据*集合

*电影简介数据* Properties:

| Property | Type | Description |
|----------|------|-------------|
|  id | INTEGER | 电影id |
|  showInfo | STRING | 上映信息 |
|  img | STRING | 海报URL |
|  sc | FLOAT | 评分 |
|  ver | STRING | 上映版本信息 |
|  imax | BOOLEAN | 是否为IMAX |
|  snum | INTEGER | 上映数 |
|  preSale | INTEGER | 是否为预售 0-否 1-是 |
|  dir | STRING | 导演 |
|  star | STRING | 演员 |
|  cat | STRING | 电影类别 |
|  wish | INTEGER | 想看人数 |
|  3d | BOOLEAN | 是否为IMAX |
|  scm | STRING | 电影简介 |
|  nm | STRIN | 电影名称 |

Response Example:

```json
{
    "code": 0,
    "message": "OK",
    "data": [
      {
        "id": 78888,
        "showInfo": "2017-06-16 下周五上映",
        "img": "http://p1.meituan.net/165.220/movie/732d8d3f60ae22fbeaa0f5b9cbb32a84391769.jpg",
        "sc": 7.5,
        "ver": "2D/IMAX 2D/中国巨幕",
        "imax": true,
        "snum": 220,
        "preSale": 1,
        "dir": "雷德利·斯科特",
        "star": "迈克尔·法斯宾德,凯瑟琳·沃特斯顿,比利·克鲁德普",
        "cat": "恐怖,惊悚,科幻",
        "wish": 125957,
        "3d": false,
        "scm": "天堂实假象，险象险中还",
        "nm": "异形：契约"
      },
      {
        "id": 246012,
        "showInfo": "今天32家影院放映135场",
        "img": "http://p0.meituan.net/165.220/movie/ee5e691b425292f455c3eac5c628cfc7904509.png",
        "sc": 8.9,
        "ver": "2D/3D/IMAX 3D/中国巨幕/全景声",
        "imax": true,
        "snum": 346169,
        "preSale": 0,
        "dir": "乔阿吉姆·罗恩尼,艾斯彭·山德伯格",
        "star": "约翰尼·德普,哈维尔·巴登,布兰顿·思怀兹",
        "cat": "喜剧,动作,奇幻",
        "wish": 518761,
        "3d": true,
        "scm": "亡灵要复仇，船长好发愁",
        "nm": "加勒比海盗5：死无对证"
      },
      ...
    ]
}
```

<a name="获取上映及待映电影列表"></a>
### 获取上映及待映电影列表

Request URI:

