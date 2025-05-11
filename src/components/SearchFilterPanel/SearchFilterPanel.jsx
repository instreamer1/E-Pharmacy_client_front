import css from './SearchFilterPanel.module.css';
import SelectField from '../SelectField/SelectField';
import InputField from '../InputField/InputField';
import iconSprite from '../../assets/sprite.svg';

const SearchFilterPanel = ({
  register,
  handleSubmit,
  onSubmit,
  onReset,
  isSubmitting,
  isValid,
  categories,
   isAnyFilterSelected,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={css.filterContainer}>
        <SelectField
          {...register('category')}
          options={categories}
          placeholder='Product category'
        />

        <InputField
          {...register('search')}
          placeholder='Search products'
          icon={
            <svg className={css.searchIcon}>
              <use href={`${iconSprite}#search`} />
            </svg>
          }
          iconAction={handleSubmit(onSubmit)}
        />

        <div className={css.buttonWrapper}>
          <button
            type='submit'
            className={css.filterButton}
            disabled={!isValid || isSubmitting}
            aria-label='Apply filters'>
            {isSubmitting ? 'Filter...' : 'Filter'}
          </button>

          { isAnyFilterSelected && (
            <button type='button' onClick={onReset} className={css.resetButton}>
              Reset filters
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default SearchFilterPanel;
