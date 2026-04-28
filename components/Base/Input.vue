<script setup>
import { vMaska } from "maska/vue"
import { errors } from "~/constants";
import { ref, onMounted, onUnmounted, computed } from "vue"

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'text',
    },
    placeholder: {
        type: String,
        default: '',
    },
    required: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    errorMessage: {
        type: String,
        default: '',
    },
    maska: {
        type: Object,
        default: {},
    },
    className: {
        type: String,
        default: '',
    },
    error: {
        type: String,
        default: '',
    },
    allowPaste: {
        type: Boolean,
        default: false,
    },
    allowCopy: {
        type: Boolean,
        default: false,
    },
    allowAutocomplete: {
        type: Boolean,
        default: false,
    },
    customName: {
        type: String,
        default: '',
    }
});

const emit = defineEmits(['update:modelValue', 'paste-blocked', 'copy-blocked']);
// Генерируем уникальное имя для поля
const uniqueId = ref(Math.random().toString(36).substr(2, 9));
const inputRef = ref(null);
const lastPasteTime = ref(0);
const isUserTyping = ref(false);
const pasteAttempts = ref(0);

// Динамическое имя поля для обхода автозаполнения
const fieldName = computed(() => {
    return props.customName || `field-${uniqueId.value}`;
});

function handleMaska(event) {
    emit('update:modelValue', event.target.value);
}

function handlePaste(event) {
    if (!props.allowPaste) {
        event.preventDefault();
        pasteAttempts.value++;
        
        // Уведомляем родительский компонент
        emit('paste-blocked', {
            timestamp: Date.now(),
            attempts: pasteAttempts.value,
            clipboardData: event.clipboardData?.getData('text')
        });
        
        // Показываем визуальную обратную связь
        if (inputRef.value) {
            inputRef.value.classList.add('paste-blocked');
            setTimeout(() => {
                inputRef.value?.classList.remove('paste-blocked');
            }, 500);
        }
        
        // После 3 попыток можно показать предупреждение
        if (pasteAttempts.value === 3) {
            console.warn('Множественные попытки вставки заблокированы');
        }
        
        return false;
    }
}

function handleCopy(event) {
    if (!props.allowCopy) {
        event.preventDefault();
        emit('copy-blocked');
        return false;
    }
}

function handleCut(event) {
    if (!props.allowCopy) {
        event.preventDefault();
        return false;
    }
}

// Обработчик ввода с защитой от автозаполнения
function handleInput(event) {
    // Защита от быстрого автоматического заполнения
    const now = Date.now();
    if (now - lastPasteTime.value < 100 && !isUserTyping.value) {
        // Возможно, это автозаполнение - сбрасываем значение
        emit('update:modelValue', '');
        return;
    }
    
    emit('update:modelValue', event.target.value);
}

// Обработчик клавиш для блокировки Ctrl+V, Ctrl+Shift+V и т.д.
function handleKeyDown(event) {
    if (props.allowPaste) return;
    
    // Проверяем сочетания клавиш
    const isPasteCombo = 
        (event.ctrlKey || event.metaKey) && 
        event.key.toLowerCase() === 'v';
    
    const isCopyCombo = 
        (event.ctrlKey || event.metaKey) && 
        ['c', 'x'].includes(event.key.toLowerCase());
    
    if (isPasteCombo || isCopyCombo) {
        event.preventDefault();
        
        // Визуальная обратная связь
        if (inputRef.value) {
            inputRef.value.classList.add('shortcut-blocked');
            setTimeout(() => {
                inputRef.value?.classList.remove('shortcut-blocked');
            }, 300);
        }
    }
}

// Отслеживаем пользовательский ввод
function onFocus() {
    isUserTyping.value = true;
    
    // Если значение похоже на автозаполненное, предлагаем очистить
    if (props.modelValue && !props.allowAutocomplete) {
        const isLikelyAutofilled = 
            props.modelValue.includes('@') && props.type === 'email' ||
            props.modelValue.length > 20 && props.type === 'text';
        
        if (isLikelyAutofilled) {
            // Можно добавить кнопку очистки или автоматически очищать
            console.log('Обнаружено возможное автозаполнение');
        }
    }
}

function onBlur() {
    isUserTyping.value = false;
}

// Глобальный обработчик для блокировки вставки через контекстное меню
function handleGlobalKeyDown(event) {
    if (!inputRef.value || !inputRef.value.contains(document.activeElement)) return;
    
    // Блокируем Shift+Insert (альтернативная вставка)
    if (event.shiftKey && event.key === 'Insert') {
        event.preventDefault();
    }
}

// Контекстное меню (правый клик)
function handleContextMenu(event) {
    if (!props.allowPaste || !props.allowCopy) {
        event.preventDefault();
        return false;
    }
}

onMounted(() => {
    if (inputRef.value && !props.allowAutocomplete) {
        // Устанавливаем специальные атрибуты для обхода автозаполнения браузеров
        inputRef.value.setAttribute('autocomplete', 'new-password');
        inputRef.value.setAttribute('autocorrect', 'off');
        inputRef.value.setAttribute('autocapitalize', 'off');
        inputRef.value.setAttribute('spellcheck', 'false');
        inputRef.value.setAttribute('inputmode', props.type === 'tel' ? 'tel' : 'text');
        
        // Для дополнительной защиты от менеджеров паролей
        inputRef.value.setAttribute('data-lpignore', 'true');
        inputRef.value.setAttribute('data-form-type', 'other');
        
        // Изменяем type через setTimeout для обхода оптимизаций браузеров
        if (props.type === 'password') {
            setTimeout(() => {
                if (inputRef.value) {
                    // Временное изменение типа может помочь
                    inputRef.value.type = 'text';
                    setTimeout(() => {
                        if (inputRef.value) {
                            inputRef.value.type = 'password';
                        }
                    }, 100);
                }
            }, 100);
        }
    }
    
    // Добавляем глобальный обработчик для дополнительной защиты
    document.addEventListener('keydown', handleGlobalKeyDown);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleGlobalKeyDown);
});
</script>

<template>
    <div class="base-input">
        <!-- Скрытое поле-обманка для менеджеров паролей -->
        <input 
            v-if="!allowAutocomplete && (type === 'password' || type === 'email')"
            type="password" 
            name="fake-password" 
            autocomplete="new-password"
            style="display: none; opacity: 0; position: absolute; left: -9999px;"
            tabindex="-1"
        />
        
        <input 
            ref="inputRef"
            :id="fieldName"
            :name="fieldName"
            :value="modelValue" 
            :class="[className, { 'paste-disabled': !allowPaste }]" 
            @input="handleInput"
            @keydown="handleKeyDown"
            @focus="onFocus"
            @blur="onBlur"
            @contextmenu="handleContextMenu"
            :type="type"
            :placeholder="placeholder" 
            :required="required" 
            :disabled="disabled" 
            v-maska="maska" 
            @maska="handleMaska"
            :autocomplete="allowAutocomplete ? 'on' : 'off'"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            @paste="handlePaste"
            @copy="handleCopy"
            @cut="handleCut"
            :data-allow-paste="allowPaste"
            :data-allow-copy="allowCopy"
        />
        
        <!-- Индикатор блокировки вставки (опционально) -->
        <div v-if="!allowPaste && pasteAttempts > 0" class="paste-warning" :class="{ 'show': pasteAttempts >= 2 }">
            <i class="fa-solid fa-ban"></i>
            <span class="warning-text">Вставка отключена</span>
        </div>
        
        <span class="error-alert" v-if="error">
            <i class="fa-solid fa-triangle-exclamation"></i>
        </span>
    </div>
</template>

<style scoped lang="scss">
    .base-input {
        border-radius: 30px;
        position: relative;
    input {
        background-color: white;
        &.paste-blocked {
            animation: shake 0.5s ease;
            border-color: #ff6b6b;
        }
        
        &.shortcut-blocked {
            animation: pulse 0.3s ease;
            border-color: #ffa94d;
        }
        
        // Стили для отключения автозаполнения в Chrome/Safari
        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus {
            -webkit-text-fill-color: #333 !important;
            -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
            transition: background-color 5000s ease-in-out 0s !important;
        }
    }
    
    .paste-warning {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: #ff6b6b;
        opacity: 0;
        transition: opacity 0.3s ease;
        
        &.show {
            opacity: 1;
        }
        
        .warning-text {
            display: none;
            
            @media (min-width: 768px) {
                display: inline;
            }
        }
    }
    
    .error-alert {
        display: block;
        font-size: 12px;
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        padding: 0;
        margin: 0;
        box-shadow: none;
        
        i {
            margin-right: 4px;
        }
    }
}

// Анимации
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
}
</style>