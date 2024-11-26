import styles from "./Sidebar.module.css";

function Sidebar({ categories,filterCategories,allCategories}) {

  return (
    <div className={styles.sidebar}>
      <h4>دسته ها</h4>
      <ul>
        <li>
          <p onClick={(event)=>allCategories(event)}>همه کالاها</p>
        </li>
        {categories.data.map((category) => (
          <li key={category._id} onClick={()=>filterCategories(category)}>
            <img src={`${category.icon}.svg`} />
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
