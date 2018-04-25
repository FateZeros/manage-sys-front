import React from "react"
import { Breadcrumb } from "antd"

import { breadcrumbMap } from "src/router/menus"

// eslint-disable-next-line
function BreadcrumbNav({ pathname }) {
  const pathSnippets = pathname.split("/").filter(i => i)
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`
        return <Breadcrumb.Item key={url}>{breadcrumbMap[url]}</Breadcrumb.Item>
      })}
    </Breadcrumb>
  )
}

export default BreadcrumbNav
