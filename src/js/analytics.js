function createAnalytics(){
    let counter = 0;
    let isDestroyed = false;
    const listener = () => {
        counter++;
        counterSpan.textContent = ` ${counter}`;
    };
    document.addEventListener('click', listener);
    return {
        destroy(){
            document.removeEventListener('click', listener);
            isDestroyed = true;
        },
        get getClicks(){
            if (isDestroyed){
                return 'Analytics is destroyed';
            }
            return counter;
        }
    };
}

window.analytics = createAnalytics();

const mainContainer = document.getElementById('main');

const analyticCountContainer = document.createElement('div');
analyticCountContainer.className = 'analytic-count-container';
analyticCountContainer.textContent = 'Всего кликов по странице:';
const counterSpan = document.createElement('span');
analyticCountContainer.appendChild(counterSpan);
counterSpan.textContent = ` ${window.analytics.getClicks}`;
mainContainer.insertBefore(analyticCountContainer, mainContainer.firstElementChild.nextSibling);