import css from './ModalTitle.module.css';

const ModalTitle =({title, description})=> {
    return (
        <div className={css.modalTitle} >
            <h3 className={css.title}>{title}</h3>
            <p className={css.description}>{description}</p>
        </div>
    );
}

export default ModalTitle;