import { iconNames } from 'assets/icons/iconNames';
import { useMatchMedia } from 'core/hooks/useMatchMedia';
import { Button } from 'core/kit/Button';
import { ButtonDifference } from 'core/kit/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectTokenState } from 'redux/auth/auth.selectors';
import { logoutUser } from 'redux/operations';
import { useTranslation } from 'react-i18next';


export const LogOutButton = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation()

    const token = useSelector(selectTokenState);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const { isMobile } = useMatchMedia();

    const size = isMobile ? '18px' : '20px';

    return (
        <Button
            type="button"
            differentStyles={ButtonDifference.primary}
            title={t('sidebar.logout')}
            onClick={handleLogout}
            iconName={iconNames.logout}
            iconSize={size}
            disabled={token ? false : true}
        />
    );
};
