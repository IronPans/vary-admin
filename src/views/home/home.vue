<template>
    <div class="va-home va-page-box">
        <va-row :gutter="16">
            <va-col :lg="3">
                <va-card class="va-card-widget">
                    <div class="va-card-widget-header">
                        <va-icon icon="description" class="va-card-widget-avatar bg-primary"/>
                    </div>
                    <span class="text-c-blue">Use space</span>
                    <h4>49/50GB</h4>
                    <div class="flex justify-center align-left m-t-10 text-muted clearfix">
                        <i class="text-c-blue m-r-5 va-icon font-16">search</i>Get more space
                    </div>
                </va-card>
            </va-col>
            <va-col :lg="3">
                <va-card class="va-card-widget">
                    <div class="va-card-widget-header">
                        <va-icon icon="donut_small" class="va-card-widget-avatar bg-green"/>
                    </div>
                    <span class="text-c-green">New Order</span>
                    <h4>49/50GB</h4>
                    <div class="flex justify-center align-left m-t-10 text-muted clearfix">
                        <i class="text-c-blue m-r-5 va-icon font-16 text-c-green">search</i>Get more space
                    </div>
                </va-card>
            </va-col>
            <va-col :lg="3">
                <va-card class="va-card-widget">
                    <div class="va-card-widget-header">
                        <va-icon icon="insert_invitation" class="va-card-widget-avatar bg-cyan"/>
                    </div>
                    <span class="text-c-cyan">Total Profit</span>
                    <h4>49/50GB</h4>
                    <div class="flex justify-center align-left m-t-10 text-muted clearfix">
                        <i class="text-c-blue m-r-5 va-icon f-16 text-c-cyan">search</i>Get more space
                    </div>
                </va-card>
            </va-col>
            <va-col :lg="3">
                <va-card class="va-card-widget">
                    <div class="va-card-widget-header">
                        <va-icon icon="file_download" class="va-card-widget-avatar bg-red"/>
                    </div>
                    <span class="text-c-red">Income</span>
                    <h4>49/50GB</h4>
                    <div class="flex justify-center align-left m-t-10 text-muted clearfix">
                        <i class="text-c-blue m-r-5 va-icon f-16 text-c-red">search</i>Get more space
                    </div>
                </va-card>
            </va-col>
        </va-row>
        <!--Chart.js-->
        <va-row :gutter="16" class="m-t-20">
            <va-col :lg="8">
                <va-card header="Earnings">
                    <template slot="content">
                        <va-chart type="line" :data="lineData"></va-chart>
                    </template>
                </va-card>
            </va-col>
            <va-col :lg="4">
                <va-card header="Tasks">
                    <template slot="content">
                        <va-chart type="doughnut" :data="doughnutData"></va-chart>
                        <p class="text-muted">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.
                        </p>
                    </template>
                </va-card>
            </va-col>
        </va-row>
        <va-row :gutter="16" class="m-t-20">
            <va-col :lg="4">
                <va-card class="va-card-order bg-warning">
                    <div class="va-card-block">
                        <h6>Revenue</h6>
                        <h2>$42,562</h2>
                        <p class="m-b-0">$5,032 <i class="feather icon-arrow-up m-l-10"></i></p>
                        <va-icon icon="visibility" class="va-card-icon"></va-icon>
                    </div>
                </va-card>
            </va-col>
            <va-col :lg="4">
                <va-card class="va-card-order bg-primary">
                    <div class="va-card-block">
                        <h6>Revenue</h6>
                        <h2>$42,562</h2>
                        <p class="m-b-0">$5,032 <i class="feather icon-arrow-up m-l-10"></i></p>
                        <va-icon icon="visibility" class="va-card-icon"></va-icon>
                    </div>
                </va-card>
            </va-col>
            <va-col :lg="4">
                <va-card class="va-card-order bg-success">
                    <div class="va-card-block">
                        <h6>Revenue</h6>
                        <h2>$42,562</h2>
                        <p class="m-b-0">$5,032 <i class="feather icon-arrow-up m-l-10"></i></p>
                        <va-icon icon="visibility" class="va-card-icon"></va-icon>
                    </div>
                </va-card>
            </va-col>
        </va-row>

        <!--transform-->

        <va-row :gutter="16" class="m-t-20">
            <va-col :lg="3">
                <va-card class="va-card-board">
                    <div class="front bg-success">
                        <va-row :gutter="16">
                            <va-col :xs="3">
                                <va-icon icon="supervisor_account" class="va-icon-4x"></va-icon>
                            </va-col>
                            <va-col :xs="8">
                                <p class="text-xl m-0">4 692</p>
                                <span>New Users</span>
                            </va-col>
                        </va-row>
                    </div>
                    <div class="back bg-success">
                        <va-row :gutter="16">
                            <va-col :xs="4" :lg="4" class="text-center">
                                <a class="text-link">
                                    <va-icon icon="settings"></va-icon>
                                    settings
                                </a>
                            </va-col>
                            <va-col :xs="4" :lg="4" class="text-center">
                                <a class="text-link">
                                    <va-icon icon="insert_link"></va-icon>
                                    content
                                </a>
                            </va-col>
                            <va-col :xs="4" :lg="4" class="text-center">
                                <a class="text-link">
                                    <va-icon icon="more_horiz"></va-icon>
                                    more
                                </a>
                            </va-col>
                        </va-row>
                    </div>
                </va-card>
            </va-col>
            <va-col :lg="3">
                <va-card class="va-card-board">
                    <div class="front bg-blue">
                        <va-row :gutter="16">
                            <va-col :xs="3">
                                <va-icon icon="shopping_cart" class="va-icon-4x"></va-icon>
                            </va-col>
                            <va-col :xs="8">
                                <p class="text-xl m-0">165 984</p>
                                <span>New Orders</span>
                            </va-col>
                        </va-row>
                    </div>
                    <div class="back bg-blue">
                        <va-row :gutter="16">
                            <va-col :xs="4" :lg="4" class="text-center">
                                <a class="text-link">
                                    <va-icon icon="settings"></va-icon>
                                    settings
                                </a>
                            </va-col>
                            <va-col :xs="4" :lg="4" class="text-center">
                                <a class="text-link">
                                    <va-icon icon="insert_link"></va-icon>
                                    content
                                </a>
                            </va-col>
                            <va-col :xs="4" :lg="4" class="text-center">
                                <a class="text-link">
                                    <va-icon icon="more_horiz"></va-icon>
                                    more
                                </a>
                            </va-col>
                        </va-row>
                    </div>
                </va-card>
            </va-col>
            <va-col :lg="3">
                <va-card class="va-card-board">
                    <div class="front bg-yellow">
                        <va-row :gutter="16">
                            <va-col :xs="3">
                                <va-icon icon="style" class="va-icon-4x"></va-icon>
                            </va-col>
                            <va-col :xs="8">
                                <p class="text-xl m-0">165 984</p>
                                <span>Sales</span>
                            </va-col>
                        </va-row>
                    </div>
                    <div class="back bg-yellow">
                        <va-row :gutter="16">
                            <va-col :xs="4" :lg="4" class="text-center">
                                <a class="text-link">
                                    <va-icon icon="settings"></va-icon>
                                    settings
                                </a>
                            </va-col>
                            <va-col :xs="4" :lg="4" class="text-center">
                                <a class="text-link">
                                    <va-icon icon="insert_link"></va-icon>
                                    content
                                </a>
                            </va-col>
                            <va-col :xs="4" :lg="4" class="text-center">
                                <a class="text-link">
                                    <va-icon icon="more_horiz"></va-icon>
                                    more
                                </a>
                            </va-col>
                        </va-row>
                    </div>
                </va-card>
            </va-col>
            <va-col :lg="3">
                <va-card class="va-card-board">
                    <div class="front bg-red">
                        <va-row :gutter="16">
                            <va-col :xs="3">
                                <va-icon icon="remove_red_eye" class="va-icon-4x"></va-icon>
                            </va-col>
                            <va-col :xs="8">
                                <p class="text-xl m-0">165 984</p>
                                <span>Visitors</span>
                            </va-col>
                        </va-row>
                    </div>
                    <div class="back bg-red">
                        <va-row :gutter="16">
                            <va-col :xs="4" :lg="4" class="text-center">
                                <a class="text-link">
                                    <va-icon icon="settings"></va-icon>
                                    settings
                                </a>
                            </va-col>
                            <va-col :xs="4" :lg="4" class="text-center">
                                <a class="text-link">
                                    <va-icon icon="insert_link"></va-icon>
                                    content
                                </a>
                            </va-col>
                            <va-col :xs="4" :lg="4" class="text-center">
                                <a class="text-link">
                                    <va-icon icon="more_horiz"></va-icon>
                                    more
                                </a>
                            </va-col>
                        </va-row>
                    </div>
                </va-card>
            </va-col>
        </va-row>
        <!--Progress widget-->
        <va-row :gutter="16" class="m-t-20">
            <va-col :lg="3">
                <va-card class="va-card-statustic-progress">
                    <template slot="header">
                        <h5 class="m-0">Open Ticket</h5>
                    </template>
                    <div class="card-block" slot="content">
                        <va-row align="middle" class="m-b-10">
                            <va-col :lg="6">
                                <label class="label bg-warning">35%
                                    <va-icon icon="arrow_upward"></va-icon>
                                </label>
                            </va-col>
                            <va-col :lg="6" class="text-right">
                                <h5 class="m-0">35</h5>
                            </va-col>
                        </va-row>
                        <div class="progress">
                            <va-progress :value="50" bar-color="#ffc107"></va-progress>
                        </div>
                    </div>
                </va-card>
            </va-col>
            <va-col :lg="3">
                <va-card class="va-card-statustic-progress">
                    <template slot="header">
                        <h5 class="m-0">Open Ticket</h5>
                    </template>
                    <div class="card-block" slot="content">
                        <va-row align="middle" class="m-b-10">
                            <va-col :lg="6">
                                <label class="label bg-primary">35%
                                    <va-icon icon="arrow_upward"></va-icon>
                                </label>
                            </va-col>
                            <va-col :lg="6" class="text-right">
                                <h5 class="m-0">35</h5>
                            </va-col>
                        </va-row>
                        <div class="progress">
                            <va-progress :value="50" bar-color="#007bff"></va-progress>
                        </div>
                    </div>
                </va-card>
            </va-col>
            <va-col :lg="3">
                <va-card class="va-card-statustic-progress">
                    <template slot="header">
                        <h5 class="m-0">Open Ticket</h5>
                    </template>
                    <div class="card-block" slot="content">
                        <va-row align="middle" class="m-b-10">
                            <va-col :lg="6">
                                <label class="label bg-danger">35%
                                    <va-icon icon="arrow_upward"></va-icon>
                                </label>
                            </va-col>
                            <va-col :lg="6" class="text-right">
                                <h5 class="m-0">35</h5>
                            </va-col>
                        </va-row>
                        <div class="progress">
                            <va-progress :value="50" bar-color="#dc3545"></va-progress>
                        </div>
                    </div>
                </va-card>
            </va-col>
            <va-col :lg="3">
                <va-card class="va-card-statustic-progress">
                    <template slot="header">
                        <h5 class="m-0">Open Ticket</h5>
                    </template>
                    <div class="card-block" slot="content">
                        <va-row align="middle" class="m-b-10">
                            <va-col :lg="6">
                                <label class="label bg-success">35%
                                    <va-icon icon="arrow_upward"></va-icon>
                                </label>
                            </va-col>
                            <va-col :lg="6" class="text-right">
                                <h5 class="m-0">35</h5>
                            </va-col>
                        </va-row>
                        <div class="progress">
                            <va-progress :value="50" bar-color="#28a745"></va-progress>
                        </div>
                    </div>
                </va-card>
            </va-col>
        </va-row>

        <va-row :gutter="16" class="m-t-20">
            <va-col :lg="8">
                <va-card>
                    <template slot="media">
                        <img src="assets/images/weather_image.jpg" alt="">
                    </template>
                    <template slot="content">
                        <va-row class="weather-full-info">
                            <va-col :lg="3" class="today-status">
                                <h1>Today</h1>
                                <va-icon class="text-success" :wi="true" icon="wi-day-sunny"></va-icon>
                                <span class="degree">
                                    32
                                    <small></small>
                                </span>
                            </va-col>
                            <va-col :lg="9">
                                <ul>
                                    <li>
                                        <h2>Tomorrow</h2>
                                        <va-icon class="text-success" :wi="true" icon="wi-day-sunny"></va-icon>
                                        <div class="statistics">32</div>
                                    </li>
                                    <li>
                                        <h2>Mon</h2>
                                        <va-icon class="text-primary" :wi="true" icon="wi-day-cloudy"></va-icon>
                                        <div class="statistics">27</div>
                                    </li>
                                    <li>
                                        <h2>Tue</h2>
                                        <va-icon class="text-info" :wi="true" icon="wi-day-hail"></va-icon>
                                        <div class="statistics">25</div>
                                    </li>
                                    <li>
                                        <h2>Wed</h2>
                                        <va-icon class="text-warning" :wi="true" icon="wi-day-lightning"></va-icon>
                                        <div class="statistics">37</div>
                                    </li>
                                    <li>
                                        <h2>Thu</h2>
                                        <va-icon class="text-success" :wi="true" icon="wi-day-snow"></va-icon>
                                        <div class="statistics">15</div>
                                    </li>
                                    <li>
                                        <h2>Fri</h2>
                                        <va-icon class="text-danger" :wi="true" icon="wi-day-sunny"></va-icon>
                                        <div class="statistics">21</div>
                                    </li>
                                </ul>
                            </va-col>
                        </va-row>
                    </template>
                </va-card>
            </va-col>
            <va-col :lg="4">
                <va-card class="user-full-info">
                    <template slot="media">
                        <img src="assets/images/weather_image.jpg" alt="">
                    </template>
                    <template slot="content">
                        <div class="user-avatar">
                            <va-avatar src="assets/images/avatar/1.jpg"></va-avatar>
                        </div>
                        <div class="user-info">
                            <h3>Siam Graves</h3>
                            <p class="text-muted">Web Designer</p>
                        </div>
                        <div class="text-center m-t-10 m-b-10">
                            <va-button theme="success">Follow me</va-button>
                        </div>
                        <va-row class="text-center m-t-10">
                            <va-col :md="4" class="border-right">
                                <h4 class="m-0">199</h4>
                                <small>Articles</small>
                            </va-col>
                            <va-col :md="4" class="border-right">
                                <h4 class="m-0">599</h4>
                                <small>Love</small>
                            </va-col>
                            <va-col :md="4">
                                <h4 class="m-0">399</h4>
                                <small>Comment</small>
                            </va-col>
                        </va-row>
                    </template>
                </va-card>
            </va-col>
        </va-row>

        <!--Knob widget-->
        <va-row :gutter="16" class="m-t-20">
            <va-col :lg="3">
                <va-card class="va-card-databox">
                    <div class="va-card-databox-left bg-danger">
                        <va-knob :value="30" :size="50" bar-color="#fff" track-color="rgba(255,255,255,.2)">
                            40%
                        </va-knob>
                    </div>
                    <div class="va-card-databox-right text-danger">
                        <span class="va-card-databox-number">10</span>
                        <div class="va-card-databox-text darkgray">
                            NEW TASKS
                        </div>
                        <div class="va-card-databox-stat">
                            <va-icon icon="school"></va-icon>
                        </div>
                    </div>
                </va-card>
            </va-col>
            <va-col :lg="3">
                <va-card class="va-card-databox">
                    <div class="va-card-databox-left bg-success">
                        <va-knob :value="30" :size="50" bar-color="#fff" track-color="rgba(255,255,255,.2)">
                            40%
                        </va-knob>
                    </div>
                    <div class="va-card-databox-right text-success">
                        <span class="va-card-databox-number">10</span>
                        <div class="va-card-databox-text darkgray">
                            NEW TASKS
                        </div>
                        <div class="va-card-databox-stat">
                            <va-icon icon="school"></va-icon>
                        </div>
                    </div>
                </va-card>
            </va-col>
            <va-col :lg="3">
                <va-card class="va-card-databox">
                    <div class="va-card-databox-left bg-warning">
                        <va-knob :value="30" :size="50" bar-color="#fff" track-color="rgba(255,255,255,.2)">
                            40%
                        </va-knob>
                    </div>
                    <div class="va-card-databox-right text-warning">
                        <span class="va-card-databox-number">10</span>
                        <div class="va-card-databox-text darkgray">
                            NEW TASKS
                        </div>
                        <div class="va-card-databox-stat">
                            <va-icon icon="school"></va-icon>
                        </div>
                    </div>
                </va-card>
            </va-col>
            <va-col :lg="3">
                <va-card class="va-card-databox">
                    <div class="va-card-databox-left bg-primary">
                        <va-knob :value="30" :size="50" bar-color="#fff" track-color="rgba(255,255,255,.2)">
                            40%
                        </va-knob>
                    </div>
                    <div class="va-card-databox-right text-primary">
                        <span class="va-card-databox-number">10</span>
                        <div class="va-card-databox-text darkgray">
                            NEW TASKS
                        </div>
                        <div class="va-card-databox-stat">
                            <va-icon icon="school"></va-icon>
                        </div>
                    </div>
                </va-card>
            </va-col>
        </va-row>

        <!--Images-->
        <va-row :gutter="16" class="m-t-20">
            <va-col :lg="6">
                <va-row>
                    <va-col :lg="6">
                        <va-card class="va-card-images">
                            <div class="va-card-bg va-card-bg1"></div>
                            <div class="va-card-context">
                                <span>Try to make all your work look like something Apple would do.</span>
                            </div>
                        </va-card>
                    </va-col>
                    <va-col :lg="6">
                        <va-card class="va-card-images">
                            <div class="va-card-bg va-card-bg2"></div>
                            <div class="va-card-context">
                                <span>Try to make all your work look like something Apple would do.</span>
                            </div>
                        </va-card>
                    </va-col>
                    <va-col :lg="6">
                        <va-card class="va-card-images">
                            <div class="va-card-bg va-card-bg3"></div>
                            <div class="va-card-context">
                                <span>Try to make all your work look like something Apple would do.</span>
                            </div>
                        </va-card>
                    </va-col>
                    <va-col :lg="6">
                        <va-card class="va-card-images">
                            <div class="va-card-bg va-card-bg4"></div>
                            <div class="va-card-context">
                                <span>Try to make all your work look like something Apple would do.</span>
                            </div>
                        </va-card>
                    </va-col>
                </va-row>
            </va-col>
            <va-col :lg="6">
                <va-card class="calendar-box">
                    <div class="calendar-header">
                        <!--<h4 class="calendar-week p-t-10 text-center">-->
                            <!--Sunday-->
                        <!--</h4>-->
                        <div class="calendar-weather">
                            <svg version="1.1" class="climacon climacon_cloudDrizzleSunAlt climacon-100 climacon-visible" viewBox="15 15 70 70">
                                <clipPath>
                                    <path d="M15,15v70h70V15H15z M57.945,49.641c-4.417,0-8-3.582-8-7.999c0-4.418,3.582-7.999,8-7.999s7.998,3.581,7.998,7.999C65.943,46.059,62.362,49.641,57.945,49.641z"></path>
                                </clipPath>
                                <clipPath>
                                    <path d="M15,15v70h20.947V63.481c-4.778-2.767-8-7.922-8-13.84c0-8.836,7.163-15.998,15.998-15.998c6.004,0,11.229,3.312,13.965,8.203c0.664-0.113,1.338-0.205,2.033-0.205c6.627,0,11.998,5.373,11.998,12c0,5.262-3.394,9.723-8.107,11.341V85H85V15H15z"></path>
                                </clipPath>
                                <g class="climacon_iconWrap climacon_iconWrap-cloudDrizzleSunAlt">
                                    <g clip-path="url(#cloudSunFillClip)">
                                        <g class="climacon_componentWrap climacon_componentWrap-sun climacon_componentWrap-sun_cloud">
                                            <g class="climacon_componentWrap climacon_componentWrap_sunSpoke">
                                                <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north"
                                                      d="M80.029,43.611h-3.998c-1.105,0-2-0.896-2-1.999s0.895-2,2-2h3.998c1.104,0,2,0.896,2,2S81.135,43.611,80.029,43.611z"></path>
                                                <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north"
                                                      d="M72.174,30.3c-0.781,0.781-2.049,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828l2.828-2.828c0.779-0.781,2.047-0.781,2.828,0c0.779,0.781,0.779,2.047,0,2.828L72.174,30.3z"></path>
                                                <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north"
                                                      d="M58.033,25.614c-1.105,0-2-0.896-2-2v-3.999c0-1.104,0.895-2,2-2c1.104,0,2,0.896,2,2v3.999C60.033,24.718,59.135,25.614,58.033,25.614z"></path>
                                                <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north"
                                                      d="M43.892,30.3l-2.827-2.828c-0.781-0.781-0.781-2.047,0-2.828c0.78-0.781,2.047-0.781,2.827,0l2.827,2.828c0.781,0.781,0.781,2.047,0,2.828C45.939,31.081,44.673,31.081,43.892,30.3z"></path>
                                                <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north"
                                                      d="M42.033,41.612c0,1.104-0.896,1.999-2,1.999h-4c-1.104,0-1.998-0.896-1.998-1.999s0.896-2,1.998-2h4C41.139,39.612,42.033,40.509,42.033,41.612z"></path>
                                                <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north"
                                                      d="M43.892,52.925c0.781-0.78,2.048-0.78,2.827,0c0.781,0.78,0.781,2.047,0,2.828l-2.827,2.827c-0.78,0.781-2.047,0.781-2.827,0c-0.781-0.78-0.781-2.047,0-2.827L43.892,52.925z"></path>
                                                <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north"
                                                      d="M58.033,57.61c1.104,0,2,0.895,2,1.999v4c0,1.104-0.896,2-2,2c-1.105,0-2-0.896-2-2v-4C56.033,58.505,56.928,57.61,58.033,57.61z"></path>
                                                <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north"
                                                      d="M72.174,52.925l2.828,2.828c0.779,0.78,0.779,2.047,0,2.827c-0.781,0.781-2.049,0.781-2.828,0l-2.828-2.827c-0.781-0.781-0.781-2.048,0-2.828C70.125,52.144,71.391,52.144,72.174,52.925z"></path>
                                            </g>
                                            <g class="climacon_wrapperComponent climacon_wrapperComponent-sunBody"
                                               clip-path="url(#sunCloudFillClip)">
                                                <circle class="climacon_component climacon_component-stroke climacon_component-stroke_sunBody"
                                                        cx="58.033" cy="41.612" r="11.999"></circle>
                                            </g>
                                        </g>
                                    </g>
                                    <g class="climacon_wrapperComponent climacon_wrapperComponent-drizzle">
                                        <path class="climacon_component climacon_component-stroke climacon_component-stroke_drizzle climacon_component-stroke_drizzle-left"
                                              d="M56.969,57.672l-2.121,2.121c-1.172,1.172-1.172,3.072,0,4.242c1.17,1.172,3.07,1.172,4.24,0c1.172-1.17,1.172-3.07,0-4.242L56.969,57.672z"></path>
                                        <path class="climacon_component climacon_component-stroke climacon_component-stroke_drizzle climacon_component-stroke_drizzle-middle"
                                              d="M50.088,57.672l-2.119,2.121c-1.174,1.172-1.174,3.07,0,4.242c1.17,1.172,3.068,1.172,4.24,0s1.172-3.07,0-4.242L50.088,57.672z"></path>
                                        <path class="climacon_component climacon_component-stroke climacon_component-stroke_drizzle climacon_component-stroke_drizzle-right"
                                              d="M43.033,57.672l-2.121,2.121c-1.172,1.172-1.172,3.07,0,4.242s3.07,1.172,4.244,0c1.172-1.172,1.172-3.07,0-4.242L43.033,57.672z"></path>
                                    </g>
                                    <g class="climacon_wrapperComponent climacon_wrapperComponent-cloud"
                                       clip-path="url(#cloudFillClip)">
                                        <path class="climacon_component climacon_component-stroke climacon_component-stroke_cloud"
                                              d="M63.999,64.944v-4.381c2.387-1.386,3.998-3.961,3.998-6.92c0-4.418-3.58-8-7.998-8c-1.603,0-3.084,0.481-4.334,1.291c-1.232-5.316-5.973-9.29-11.664-9.29c-6.628,0-11.999,5.372-11.999,12c0,3.549,1.55,6.729,3.998,8.926v4.914c-4.776-2.769-7.998-7.922-7.998-13.84c0-8.836,7.162-15.999,15.999-15.999c6.004,0,11.229,3.312,13.965,8.203c0.664-0.113,1.336-0.205,2.033-0.205c6.627,0,11.998,5.373,11.998,12C71.997,58.864,68.655,63.296,63.999,64.944z"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div class="calendar-today">
                            <span class="degree">
                            35.18<sup><sup>o</sup></sup>c
                            </span>
                        </div>
                    </div>
                    <va-date-picker style="width: 100%" :inline="true" width="100%"></va-date-picker>
                </va-card>
            </va-col>
        </va-row>

        <!--<va-row :gutter="16">-->
            <!--<va-col :lg="4">-->
                <!--<va-card class="va-card-tile">-->
                    <!--<div class="lined-paper">-->
                        <!--<h4 class="m-0">This is my note #3</h4>-->
                        <!--<p class="text-muted m-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.</p>-->
                    <!--</div>-->
                <!--</va-card>-->
            <!--</va-col>-->
        <!--</va-row>-->
    </div>
</template>

<script>

    export default {
        name: "va-home",
        data() {
            return {
                chartColors: {
                    red: 'rgb(255, 99, 132)',
                    orange: 'rgb(255, 159, 64)',
                    yellow: 'rgb(255, 205, 86)',
                    green: 'rgb(75, 192, 192)',
                    blue: 'rgb(54, 162, 235)',
                    purple: 'rgb(153, 102, 255)',
                    grey: 'rgb(201, 203, 207)'
                },
                lineData: {},
                doughnutData: {}
            }
        },
        methods: {
            randomScalingFactor() {
                return Math.round(Math.random() * 100);
            },
            handleClick() {
                Toast.show({
                    message: '提示信息',
                    onClose() {
                        console.log(123);
                    }
                });
            },
            openNotification() {
                this.$Notification.show({
                    title: 'Tip',
                    message: '提示信息'
                });
            }
        },
        mounted() {
            const chartColors = {
                red: 'rgb(255, 99, 132)',
                orange: 'rgb(255, 159, 64)',
                yellow: 'rgb(255, 205, 86)',
                green: 'rgb(75, 192, 192)',
                blue: 'rgb(54, 162, 235)',
                purple: 'rgb(153, 102, 255)',
                grey: 'rgb(201, 203, 207)'
            };
            this.lineData = {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets: [
                    {
                        label: 'The First Week',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        backgroundColor: this.chartColors.blue,
                        borderColor: this.chartColors.blue
                    },
                    {
                        label: 'The Second Week',
                        data: [28, 48, 40, 19, 86, 27, 90],
                        fill: false,
                        backgroundColor: this.chartColors.red,
                        borderColor: this.chartColors.red
                    }
                ]
            };

            this.doughnutData = {
                datasets: [{
                    data: [
                        this.randomScalingFactor(),
                        this.randomScalingFactor()
                    ],
                    backgroundColor: [
                        '#76e4e0',
                        '#46c9fb'
                    ],
                    label: 'Dataset 1'
                }],
                labels: [
                    '2017 year',
                    '2018 year'
                ]
            }
        }
    }
</script>

<style scoped lang="less">
    @import "./home";

    .va-card-images {
        height: 200px;
    }

    .va-card-bg1 {
        background-image: url(../../assets/images/bg/camera1.jpg)
    }

    .va-card-bg2 {
        background-image: url(../../assets/images/bg/camera2.jpg)
    }

    .va-card-bg3 {
        background-image: url(../../assets/images/bg/camera3.jpg)
    }

    .va-card-bg4 {
        background-image: url(../../assets/images/bg/camera4.jpg)
    }
</style>