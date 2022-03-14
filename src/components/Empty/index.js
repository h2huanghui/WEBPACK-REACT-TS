import React, { Component, useEffect } from 'react';
import Layout from '@/components/Layout';
import EmptySrc from '@/assets/img/noData/img_empty.png'
import EmptySrc_doba from '@/assets/img/noData/img_empty_doba.png'
import { Empty } from 'antd';
import '@/styles/components/Empty/index.less'

export default function EmptyPage({
    imageUrl = EmptySrc,
    style,
    imageStyle,
    className,
    description = 'No Results',
    title,
    showLayout = true,
    children
}){
    let empty = <Empty
        image={imageUrl}
        className={'empty-wrap ' + className}
        style={style}
        imageStyle={imageStyle}
        description={description}
    >{children}</Empty>
    if (showLayout) {
        return (
            <Layout title={title}>
                {empty}
            </Layout>
        )
    } else {
        return empty
    }
}