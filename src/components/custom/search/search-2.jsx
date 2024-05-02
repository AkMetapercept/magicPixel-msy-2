import React, { useState } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';

const Search2 = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            title
          }
          headings {
            value
          }
          fields {
            slug
          }
        }
      }
    }
  `);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const allLinksData = [];

  data.allMdx.nodes.map((node) => {
    allLinksData.push({
      title: node?.frontmatter?.title,
      url: node?.fields?.slug,
    });

    if (node?.headings.length > 0) {
      node.headings.map((heading) => {
        const idPath = heading?.value.replace(/\s+/g, '').toLowerCase();

        allLinksData.push({
          title: heading?.value,
          url: node?.fields?.slug + '/#' + idPath,
        });
      });
    }
  });

  const handleInputChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    if (value) {
      const searchResults = allLinksData?.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setResults(() => searchResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div>
     <div className="search-form-container  ">
      <form className="form-group">
      <input type="text" className="search-bar"  value={query} onChange={handleInputChange} style={{marginLeft:'0px'}} placeholder="Search..." />
          <button className="searchicon">
            <i className="fa-solid fa-magnifying-glass" style={{ color: '#1B0C8A' }}></i>
          </button>
       
      </form>
    </div>
    
     
      <ul style={{listStyle:'none'}}>
        {results.map((result, i) => (
          <li key={i}>
            <Link to={result.url}>
              <h6 style={{color:'var(--link)'}}>{result.title}</h6>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search2;
