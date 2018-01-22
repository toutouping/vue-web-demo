<template>
  <div class="company-help">
    <section class="user-info">
      <div class="title">
        <p>下午好，admin</p>
      </div>
      <div class="info">
        <span class="logo"><img src="../../../common/img/user-logo.png"></span>
        <div class="info-right">
          <p class="account">账号信息：</p>
          <p class="mail">绑定邮箱信息：8767XXXqq.com<a>管理</a></p>
          <p class="near-login">最近登录：2018年1月18日星期四下午4点28分9秒<a>详情</a></p>
        </div>
      </div>
    </section>
    <section class="introduction">
      <div class="title">
        <p>系统功能介绍</p>
      </div>
      <ul class="intro">
        <li>
          <span class="icon-search"></span>
          <div class="intro-detail">
            <p class="intro-title">自助查询</p>
            <p>支持XXXXX，管理用户权限XXXX</p>
          </div>
        </li>
        <li>
          <span class="icon-search"></span>
          <div class="intro-detail">
            <p class="intro-title">自助查询</p>
            <p>支持XXXXX，管理用户权限XXXX</p>
          </div>
        </li>
        <li>
          <span class="icon-search"></span>
          <div class="intro-detail">
            <p class="intro-title">自助查询</p>
            <p>支持XXXXX，管理用户权限XXXX</p>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang="stylus" scoped>
  .company-help {
    .user-info {
      font-size: 14px;
      background: #fafafa;
      margin-bottom: 38px;
      .title {
        background: #f0f1f3;
        height: 36px;
        line-height: 36px;
        p {
          display inline-block;
          height: 16px;
          line-height 16px;
          margin: 0 6px 0px 12px;
          padding-left: 6px;
          border-left: solid 4px #057ab8;
          vertical-align middle;
        }
      }
      .info {
        padding-top: 10px;
        padding-left: 30px;
        .logo {
          display inline-block;
          width: 60px;
          height: 60px;
          margin-top: 8px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info-right {
          display: inline-block;
          padding-top: 8px;
          min-height: 76px;
          line-height: 22px;
          margin-left: 12px;
          vertical-align: top;
          .account {
            font-weight: bold;
          }
        }
      }
    }
    .introduction {
      font-size: 14px;
      background: #fafafa;
      margin-bottom: 38px;
      .title {
        background: #f0f1f3;
        height: 36px;
        line-height: 36px;
        p {
          display inline-block;
          height: 16px;
          line-height 16px;
          margin: 0 6px 0px 12px;
          padding-left: 6px;
          border-left: solid 4px #057ab8;
          vertical-align middle;
        }
      }
      .intro {
        padding-top: 10px;
        padding-left: 30px;
        li {
          padding: 10px;
          .icon-search {
            display:inline-block;
            width: 52px;
            height: 52px;
            background-image: url(features.png);
            background-position: 0 0;
          }
          .intro-detail {
            display: inline-block;
            margin-left: 12px;
            line-height: 20px;
            font-size: 12px;
            vertical-align: top;
            .intro-title {
              color: #0079bd;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>
