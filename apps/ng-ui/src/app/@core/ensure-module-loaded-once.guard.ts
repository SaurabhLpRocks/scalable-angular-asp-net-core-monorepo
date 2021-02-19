interface TargetModule {
  // #region Properties (1)

  constructor: { name: string };

  // #endregion Properties (1)
}

export class EnsureModuleLoadedOnceGuard {
  // #region Constructors (1)

  constructor(targetModule: TargetModule) {
    if (targetModule) {
      throw new Error(`${targetModule.constructor.name} has already been loaded.
      Import this module in AppModule only.`);
    }
  }

  // #endregion Constructors (1)
}
