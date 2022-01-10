// import { BehaviorSubject } from 'rxjs';

// const defaultOption = {
//   distinctOnly: true
// };

// export function Subjectize<T>(keyToWatch: string, options = defaultOption): PropertyDecorator {
//   return (target: Object, propKey: string) => {
//     const internalKey = Symbol(keyToWatch);

//     Object.defineProperties(target, {
//       [keyToWatch]: {
//         get(): T {
//           return this[internalKey];
//         },
//         set(value: T) {
//           this[internalKey] = value;

//           if (this[propKey]) {
//             if (!options.distinctOnly || JSON.stringify(this[propKey].value) !== JSON.stringify(value)) {
//               this[propKey].next(value);
//             }
//           } else {
//             this[propKey] = new BehaviorSubject(value);
//           }
//         }
//       }
//     });
//   };
// }
