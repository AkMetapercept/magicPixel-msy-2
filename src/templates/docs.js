import React, { Component, useState } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';

import { Layout, Link, LayoutHome, LayoutOther } from '$components';
import NextPrevious from '../components/NextPrevious';
import config from '../../config';
import Footer from '../components/footer/footer';

const forcedNavOrder = config.sidebar.forcedNavOrder;

export default class MDXRuntimeTest extends Component {
  render() {
    const { data } = this.props;

    if (!data) {
      return this.props.children;
    }
    const { allMdx, mdx } = data;
    // console.log('🚀 ~ file: docs.js:20 ~ MDXRuntimeTest ~ render ~ mdx:', mdx);
    // console.log('🚀 ~ file: docs.js:27 ~ MDXRuntimeTest ~ render ~ allMdx:', allMdx);

    const githubIcon = require('../components/images/github.svg').default;
    const navItems = allMdx.edges
      .map(({ node }) => node.fields.slug)
      .filter((slug) => slug !== '/');
    // console.log('🚀 ~ file: docs.js:33 ~ MDXRuntimeTest ~ render ~ navItems:', navItems);

    navItems.sort();

    // console.log('🚀 ~ file: docs.js:33 ~ MDXRuntimeTest ~ render ~ navItems:', navItems);
    navItems.reduce(
      (acc, cur) => {
        if (forcedNavOrder.find((url) => url === cur)) {
          return { ...acc, [cur]: [cur] };
        }

        let prefix = cur.split('/')[1];

        if (config.gatsby && config.gatsby.trailingSlash) {
          prefix = prefix + '/';
        }

        if (prefix && forcedNavOrder.find((url) => url === `/${prefix}`)) {
          return { ...acc, [`/${prefix}`]: [...acc[`/${prefix}`], cur] };
        } else {
          return { ...acc, items: [...acc.items, cur] };
        }
      },
      { items: [] }
    );

    const nav = forcedNavOrder
      .reduce((acc, cur) => {
        return acc.concat(navItems[cur]);
      }, [])
      .concat(navItems.items)
      .map((slug) => {
        if (slug) {
          const { node } = allMdx.edges.find(({ node }) => node.fields.slug === slug);

          return { title: node.fields.title, url: node.fields.slug };
        }
      });
    // console.log('🚀 ~ file: docs.js:67 ~ MDXRuntimeTest ~ render ~ nav:', nav);

    // meta tags
    const metaTitle = mdx.frontmatter.metaTitle;

    // const metaDescription = mdx.frontmatter?.metaDescription;

    // let canonicalUrl = config.gatsby.siteUrl;

    // canonicalUrl =
    //   config.gatsby.pathPrefix !== '/' ? canonicalUrl + config.gatsby.pathPrefix : canonicalUrl;
    // canonicalUrl = canonicalUrl + mdx.fields.slug;

    return mdx?.fields?.slug === '/' ? (
      <LayoutHome {...this.props} edges={allMdx.edges}>
        <Helmet>
          {metaTitle ? <title>{metaTitle}</title> : null}
          {metaTitle ? <meta name="title" content={metaTitle} /> : null}
        </Helmet>

        <div className="main-body-wrapper">
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
        <div className={'addPaddTopBottom'}>
          <NextPrevious mdx={mdx} nav={nav} allMdx={allMdx} {...this.props} />
        </div>
        <Footer />
      </LayoutHome>
    ) : (
      <LayoutOther {...this.props} edges={allMdx.edges}>
        <Helmet>
          {metaTitle ? <title>{metaTitle}</title> : null}
          {metaTitle ? <meta name="title" content={metaTitle} /> : null}
        </Helmet>

        <div className="main-body-wrapper">
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
        <div className={'addPaddTopBottom'}>
          <NextPrevious mdx={mdx} nav={nav} allMdx={allMdx} {...this.props} />
        </div>
        <Footer />
      </LayoutOther>
    );
  }
}

export const pageQuery = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        title
        docsLocation
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        id
        title
        slug
      }
      body
      tableOfContents
      parent {
        ... on File {
          relativePath
        }
      }
      frontmatter {
        metaTitle
      }
    }
    allMdx {
      edges {
        node {
          fields {
            slug
            title
          }
          frontmatter {
            order
          }
        }
      }
    }
  }
`;

// mdx(fields: { id: { eq: $id } }) {
//       fields {
//         id
//         title
//         slug
//       }
//       body
//       tableOfContents
//       parent {
//         ... on File {
//           relativePath
//         }
//       }
//       frontmatter {
//         metaTitle
//         metaDescription
//       }
//     }
