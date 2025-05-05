import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  selectCategories,
  selectCategory,
} from '../../redux/productsSlice/selectors';
import { getCategories } from '../../redux/productsSlice/operations';
import { resetFilters, setCategory } from '../../redux/productsSlice/slice';
import css from './SearchFilterPanel.module.css';

export const SearchFilterPanel = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState('');

  const category = useSelector(selectCategory);
  const categories = useSelector(selectCategories);

  // useEffect(() => {
  //   // Загружаем категории только при первом рендере
  //   dispatch(getCategories());
  // }, [dispatch])

//   useEffect(() => {
//     dispatch(getCategories());
//     setLocalSearch(searchParams.get('search') || '');
//   }, [dispatch, searchParams]);

  const handleSearch = () => {
    const params = {
      category,
      search: localSearch,
      page: 1, // Сбрасываем на первую страницу
    };
    setSearchParams(params);
  };

  const handleReset = () => {
    setLocalSearch('');
    dispatch(resetFilters());
    setSearchParams({ category: 'All', search: '', page: 1 });
  };

  return (
    <div className={css.searchPanel}>
      <select
        className={css.select}
        value={category}
        onChange={e => {
          dispatch(setCategory(e.target.value));
          setSearchParams({
            category: e.target.value,
            search: localSearch,
            page: 1,
          });
        }}>
        <option value='All'>All</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        className={css.input}
        type='text'
        placeholder='Search medicine'
        value={localSearch}
        onChange={e => setLocalSearch(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && handleSearch()}
      />

      <button className={css.button} onClick={handleSearch}>
        Search
      </button>
      <button className={css.button} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};
