<template>
  <div class="company-help">
    <section class="user-info">
      <div class="title">
        <p>{{$t('welcom.userTitle')}}</p>
      </div>
      <div class="info">
        <span class="logo"><img src="../../../common/img/user-logo.png"></span>
        <div class="info-right">
          <p class="account">{{$t('welcom.account')}}</p>
          <p class="mail">{{$t('welcom.mail')}}<a>{{$t('welcom.mailManage')}}</a></p>
          <p class="near-login">{{$t('welcom.nearLogin')}}<a>{{$t('welcom.loginDetail')}}</a></p>
        </div>
      </div>
    </section>
    <section class="introduction">
      <div class="title">
        <p>{{$t('welcom.sysTitle')}}</p>
      </div>
      <ul class="intro">
        <li>
          <span class="icon-search"></span>
          <div class="intro-detail">
            <p class="intro-title">{{$t('welcom.selfSearch')}}</p>
            <p>{{$t('welcom.support')}}</p>
          </div>
        </li>
        <li>
          <span class="icon-search"></span>
          <div class="intro-detail">
            <p class="intro-title">{{$t('welcom.selfSearch')}}</p>
            <p>{{$t('welcom.support')}}</p>
          </div>
        </li>
        <li>
          <span class="icon-search"></span>
          <div class="intro-detail">
            <p class="intro-title">{{$t('welcom.selfSearch')}}</p>
            <p>{{$t('welcom.support')}}</p>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang="stylus" scoped>
  .company-help {
    background: #e4e5e6;
    .user-info {
      font-size: 14px;
      background: #fafafa;
      margin-bottom: 20px;
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
        padding: 10px 0 10px 30px;
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
        padding: 10px 0 10px 30px;
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
